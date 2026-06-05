import { z } from "zod";

export const createReservationSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().min(1).default(1),
});
