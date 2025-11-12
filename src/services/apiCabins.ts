import supabase from "./supabase";
import type { Database } from "@/types/supabase";

type Cabin = Database["public"]["Tables"]["cabins"]["Insert"];

const cabinServices = {
  getCabins: async () => {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }
    return data;
  },

  deleteCabin: async (cabinId: number) => {
    const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be deleted");
    }
  },

  createCabin: async (newCabin: Cabin) => {
    const { data, error } = await supabase.from("cabins").insert(newCabin);
    if (error) {
      console.error(error);
      throw new Error("Cabin could not be created");
    }
    return data;
  },
};

export default cabinServices;
