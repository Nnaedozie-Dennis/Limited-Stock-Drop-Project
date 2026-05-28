

import { PrismaClient, ReservationStatus } from "@prisma/client";
import { AppError } from "../middleware/errorHandler";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();   // ← Force reload .env

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env");
}

// const pool = new Pool({ connectionString });
const pool = new Pool({ 
  connectionString,
  max: 10,           // Connection pool size
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
}