import { Request, Response, NextFunction } from "express";
import { ReservationService } from "../services/reservationService";
import { reserveSchema } from "../utils/validators";

const reservationService = new ReservationService();

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId, quantity } = reserveSchema.parse(req.body);

    // For now, we'll use a dummy userId. Later we'll add JWT auth.
    const userId = req.body.userId || "user_dummy_001";

    const reservation = await reservationService.createReservation(
      userId,
      productId,
      quantity,
    );

    res.status(201).json({
      success: true,
      data: {
        reservationId: reservation.id,
        expiresAt: reservation.expiresAt,
        quantity: reservation.quantity,
      },
    });
  } catch (error) {
    next(error);
  }
};
