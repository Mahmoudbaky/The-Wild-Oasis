import { z } from "zod";
import supabase, { supabaseUrl } from "./supabase";

const bookingsServices = {
  getBookings: async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("* , cabins(name) , guests(fullName)");

    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }
    return data;
  },
};

export default bookingsServices;
