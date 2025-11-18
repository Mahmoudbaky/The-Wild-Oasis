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
    sortBy: {
      field: string;
      direction: string;
    };
  }) => {
    let query = supabase
      .from("bookings")
      .select("* , cabins(name) , guests(fullName ,email)");

    //filter bookings based on status
    if (filter !== null) {
      query = query.eq(filter!.field, filter!.value);
    }

    //Sort bookings by date
    if (sortBy)
      query = query.order(sortBy.field, {
        ascending: sortBy.direction === "asc",
      });

    const { data, error } = await query;

    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }
    return data;
  },
};

export default bookingsServices;
