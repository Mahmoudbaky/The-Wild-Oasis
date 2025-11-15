import { z } from "zod";
import supabase, { supabaseUrl } from "./supabase";

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
};

export default settingsServices;
