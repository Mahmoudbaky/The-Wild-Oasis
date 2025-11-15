import { z } from "zod";

export const settingsSchema = z.object({
  minBookingLength: z.coerce
    .number()
    .min(1, "Minimum booking length is required"),
  maxBookingLength: z.coerce
    .number()
    .min(1, "Maximum booking length is required"),
  maxGestsPerBooking: z.coerce
    .number()
    .min(1, "Maximum guests per booking is required"),
  breakfastPrice: z.coerce
    .number()
    .min(0, "Breakfast price per guest is required"),
});
