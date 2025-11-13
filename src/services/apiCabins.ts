import { z } from "zod";
import supabase, { supabaseUrl } from "./supabase";
import { cabinSchema, editCabinSchema } from "@/validators/cabinValidators";

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
    const cabinImage: File = newCabin.image as File;

    const imageName = `${Math.random()}-${cabinImage?.name}`.replaceAll(
      "/",
      ""
    );

    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();

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

  editCabin: async (
    editedCabin: Partial<z.infer<typeof editCabinSchema>>,
    id: number
  ) => {
    console.log(editedCabin, id);

    const hasImagePath = typeof editedCabin.image === "string";

    const cabinImage: File = editedCabin.image as File;

    const imageName = `${Math.random()}-${cabinImage?.name}`.replaceAll(
      "/",
      ""
    );

    const imagePath = hasImagePath
      ? editedCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { data, error } = await supabase
      .from("cabins")
      .update({ ...editedCabin, image: imagePath })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Cabin could not be updated");
    }

    if (!hasImagePath) {
      const { error: uploadError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, editedCabin.image);
      if (uploadError) {
        throw new Error("Image could not be uploaded");
      }
    }

    return data;
  },
};

export default cabinServices;
