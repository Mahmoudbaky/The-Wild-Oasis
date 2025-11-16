import { z } from "zod";
import { cabinSchema, editCabinSchema } from "@/validators/cabinValidators";
import type { Database } from "@/types/supabase";

export type CabinFormData = z.infer<typeof cabinSchema>;
export type EditCabinFormData = z.infer<typeof editCabinSchema>;

export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];
