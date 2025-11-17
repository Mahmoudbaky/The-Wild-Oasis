import { z } from "zod";
import { cabinSchema, editCabinSchema } from "@/validators/cabinValidators";
import type { Database } from "@/types/supabase";

export type CabinFormData = z.infer<typeof cabinSchema>;
export type EditCabinFormData = z.infer<typeof editCabinSchema>;

export type Booking = Database["public"]["Tables"]["bookings"]["Row"] & {
  cabins: {
    name: Database["public"]["Tables"]["cabins"]["Row"]["name"];
  };
  guests: {
    fullName: Database["public"]["Tables"]["guests"]["Row"]["fullName"];
  };
};
export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
export type guest = Database["public"]["Tables"]["guests"]["Row"];
