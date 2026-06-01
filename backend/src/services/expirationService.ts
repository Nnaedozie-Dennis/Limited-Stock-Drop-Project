import prisma from "../lib/prisma"; 
import { ReservationStatus } from "@prisma/client";

export class ExpirationService {
  async expireReservations() {
    const now = new Date();

    const expiredReservations = await prisma.reservation.findMany({
      where: {
        status: ReservationStatus.PENDING,
        expiresAt: { lt: now },
      },
      include: { product: true },
    });

    for (const reservation of expiredReservations) {
      await prisma.$transaction(async (tx) => {
        // Restore stock
        await tx.product.update({
          where: { id: reservation.productId },
          data: {
            stock: { increment: reservation.quantity },
            version: { increment: 1 },
          },
        });

        // Mark as expired
        await tx.reservation.update({
          where: { id: reservation.id },
          data: { status: ReservationStatus.EXPIRED },
        });

        // Log the expiration
        await tx.inventoryLog.create({
          data: {
            productId: reservation.productId,
            userId: reservation.userId,
            reservationId: reservation.id,
            action: "EXPIRE",
            quantityChange: reservation.quantity,
            notes: `Reservation expired and stock restored`,
          },
        });
      });
    }

    if (expiredReservations.length > 0) {
      console.log(`✅ Expired ${expiredReservations.length} reservations`);
    }
  }
}
