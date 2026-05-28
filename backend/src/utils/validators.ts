import { z } from "zod";

export const reserveSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(5),
});

export const checkoutSchema = z.object({
  reservationId: z.string().min(1),
});
