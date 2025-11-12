import { z } from "zod";

export const cabinSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  maxCapacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  regularPrice: z.coerce.number().min(0, "Price must be at least 0"),
  discount: z.coerce
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount cannot be more than 100")
    .optional(),
  description: z.string().optional(),
  image: z.string().url("Image must be a valid URL").optional(),
});
