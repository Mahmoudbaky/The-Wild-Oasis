import { z } from "zod";
import supabase, { supabaseUrl } from "./supabase";
import { cabinSchema } from "@/validators/cabinValidators";

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

  createCabin: async (newCabin: z.infer<typeof cabinSchema>) => {
    const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
      "/",
      ""
    );

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { data, error } = await supabase
      .from("cabins")
      .insert({ ...newCabin, image: imagePath });
    if (error) {
      console.error(error);
      throw new Error("Cabin could not be created");
    }

    const { error: uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (uploadError) {
      // data's shape is not known to TypeScript here, assert the id safely before using it
      const insertedRow = data as { id: number } | null;
      if (insertedRow?.id) {
        await supabase.from("cabins").delete().eq("id", insertedRow.id);
      }
    }

    return data;
  },
};

export default cabinServices;
