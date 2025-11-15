import { z } from "zod";
import supabase, { supabaseUrl } from "./supabase";
import { settingsSchema } from "@/validators/settingsValidators";

const settingsServices = {
  getSettings: async () => {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      throw new Error("Settings could not be loaded");
    }
    return data;
  },

  updateSettings: async (newSettings: z.infer<typeof settingsSchema>) => {
    const { data, error } = await supabase
      .from("settings")
      .update(newSettings)
      .eq("id", 1)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Settings could not be updated");
    }
    return data;
  },
};

export default settingsServices;
