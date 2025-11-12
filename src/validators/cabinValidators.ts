import { z } from "zod";

// Validate that discount is no greater than the entered regularPrice
export const cabinSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    maxCapacity: z.coerce.number().min(1, "Capacity must be at least 1"),
    regularPrice: z.coerce.number().min(0, "Price must be at least 0"),
    // keep the non-negative check here; the max check is handled below against regularPrice
    discount: z.coerce
      .number()
      .min(0, "Discount must be at least 0")
      .optional(),
    description: z.string().optional(),
    image: z.string().url("Image must be a valid URL").optional(),
  })
  .superRefine((data, ctx) => {
    const { discount, regularPrice } = data;
    if (discount !== undefined && discount !== null) {
      // discount and regularPrice are coerced numbers above; check relational constraint
      if (discount > regularPrice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["discount"],
          message: "Discount cannot be more than regular price",
        });
      }
    }
  });
