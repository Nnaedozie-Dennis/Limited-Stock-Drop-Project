import { z } from "zod";

export const reserveSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1).max(5),
  userId: z.string().optional(),
});

export const checkoutSchema = z.object({
  reservationId: z.string().min(1),
});

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(10),
  sort: z.string().optional(),
  filter: z.string().optional(),
});
