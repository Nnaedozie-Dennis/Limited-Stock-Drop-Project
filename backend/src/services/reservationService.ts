import { PrismaClient, ReservationStatus } from "@prisma/client";
import { AppError } from "../middleware/errorHandler";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "../../node_modules/@types/pg";
import dotenv from "dotenv";
// import { OrderStatus } from "@prisma/client";

dotenv.config(); // ← Force reload .env

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env");
}

// const pool = new Pool({ connectionString });
const pool = new Pool({
  connectionString,
  max: 10, // Connection pool size
  idleTimeoutMillis: 30000,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export class ReservationService {
  async createReservation(userId: string, productId: string, quantity: number) {
    return await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) throw new AppError("Product not found", 404);
      if (product.stock < quantity)
        throw new AppError("Insufficient stock", 400);
      if (!product.isActive)
        throw new AppError("Product is no longer available", 400);

      const existingReservation = await tx.reservation.findFirst({
        where: {
          userId,
          productId,
          status: ReservationStatus.PENDING,
        },
      });

      if (existingReservation) {
        throw new AppError(
          "You already have an active reservation for this product",
          409,
        );
      }

      const updatedProduct = await tx.product.update({
        where: {
          id: productId,
          version: product.version,
        },
        data: {
          stock: { decrement: quantity },
          version: { increment: 1 },
        },
      });

      if (!updatedProduct) {
        throw new AppError(
          "Stock update failed due to concurrent modification",
          409,
        );
      }

      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      const reservation = await tx.reservation.create({
        data: {
          userId,
          productId,
          quantity,
          expiresAt,
          status: ReservationStatus.PENDING,
        },
      });

      await tx.inventoryLog.create({
        data: {
          productId,
          userId,
          reservationId: reservation.id,
          action: "RESERVE",
          quantityChange: -quantity,
          notes: `Reservation created for ${quantity} items`,
        },
      });

      return reservation;
    });
  }

  //   async checkout(reservationId: string) {
  //   return await prisma.$transaction(async (tx) => {
  //     // 1. Find the reservation
  //     const reservation = await tx.reservation.findUnique({
  //       where: { id: reservationId },
  //       include: { product: true }
  //     });

  //     if (!reservation) throw new AppError('Reservation not found', 404);
  //     if (reservation.status !== ReservationStatus.PENDING) {
  //       throw new AppError('Reservation is no longer valid', 400);
  //     }
  //     if (new Date() > reservation.expiresAt) {
  //       throw new AppError('Reservation has expired', 400);
  //     }

  //     // 2. Create Order
  //     const order = await tx.order.create({
  //       data: {
  //         userId: reservation.userId,
  //         reservationId: reservation.id,
  //         productId: reservation.productId,
  //         total: reservation.product.price * reservation.quantity,
  //         status: OrderStatus.COMPLETED,
  //       },
  //     });

  //     // 3. Mark reservation as completed
  //     await tx.reservation.update({
  //       where: { id: reservationId },
  //       data: { status: ReservationStatus.COMPLETED }
  //     });

  //     // 4. Log the checkout
  //     await tx.inventoryLog.create({
  //       data: {
  //         productId: reservation.productId,
  //         userId: reservation.userId,
  //         reservationId: reservation.id,
  //         action: 'CHECKOUT',
  //         quantityChange: -reservation.quantity,
  //         notes: `Checkout completed for order ${order.id}`,
  //       },
  //     });

  //     return { order, reservation };
  //   });
  // }

  async checkout(reservationId: string) {
    return await prisma.$transaction(async (tx) => {
      const reservation = await tx.reservation.findUnique({
        where: { id: reservationId },
        include: { product: true },
      });

      if (!reservation) throw new AppError("Reservation not found", 404);
      if (reservation.status !== "PENDING") {
        throw new AppError("Reservation is no longer valid", 400);
      }
      if (new Date() > reservation.expiresAt) {
        throw new AppError("Reservation has expired", 400);
      }

      // Create Order
      const order = await tx.order.create({
        data: {
          userId: reservation.userId,
          reservationId: reservation.id,
          productId: reservation.productId,
          total: reservation.product.price * reservation.quantity,
          status: "COMPLETED",
        },
      });

      // Mark reservation as completed
      await tx.reservation.update({
        where: { id: reservationId },
        data: { status: "COMPLETED" },
      });

      // Log action
      await tx.inventoryLog.create({
        data: {
          productId: reservation.productId,
          userId: reservation.userId,
          reservationId: reservation.id,
          action: "CHECKOUT",
          quantityChange: -reservation.quantity,
          notes: `Checkout completed for order ${order.id}`,
        },
      });

      return { order, reservation };
    });
  }
}
