import { z } from "zod";
import supabase, { supabaseUrl } from "./supabase";

const bookingsServices = {
  getBookings: async ({
    filter,
    sortBy,
  }: {
    filter: {
      field: string;
      value: string | number;
    } | null;
    sortBy: string;
  }) => {
    let query = supabase
      .from("bookings")
      .select("* , cabins(name) , guests(fullName ,email)");

    if (filter !== null) {
      query = query.eq(filter!.field, filter!.value);
    }

    const { data, error } = await query;

    console.log(data);

    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }
    return data;
  },
};

export default bookingsServices;
