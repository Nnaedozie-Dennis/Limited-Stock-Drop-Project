
import { Request, Response, NextFunction } from "express";
import { ReservationService } from "../services/reservationService";
import { checkoutSchema } from "../utils/validators";

const reservationService = new ReservationService();

export const checkout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { reservationId } = checkoutSchema.parse(req.body);

    const result = await reservationService.checkout(reservationId);

    res.status(200).json({
      success: true,
      message: "Checkout completed successfully",
      data: {
        orderId: result.order.id,
        total: result.order.total,
        reservationId: result.reservation.id,
      },
    });
  } catch (error) {
    next(error);
  }
};