import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

export const getUserReservations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId as string; 

    if (!userId) {
      res.status(400).json({ success: false, error: "User ID is required" });
      return;
    }

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId as string; // ← Fixed

    if (!userId) {
      res.status(400).json({ success: false, error: "User ID is required" });
      return;
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};
