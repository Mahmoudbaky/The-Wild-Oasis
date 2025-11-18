import { z } from "zod";
import supabase, { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "@/lib/constants";

const bookingsServices = {
  getBookings: async ({
    filter,
    sortBy,
    page,
  }: {
    filter: {
      field: string;
      value: string | number;
      method?: "eq" | "neq" | "gt" | "lt" | "gte" | "lte";
    } | null;
    sortBy: {
      field: string;
      direction: string;
    };
    page: number;
  }) => {
    let query = supabase
      .from("bookings")
      .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

    //filter bookings based on status
    if (filter) {
      const { method = "eq", field, value } = filter;
      switch (method) {
        case "eq":
          query = query.eq(field, value as any);
          break;
        case "neq":
          query = query.neq(field, value as any);
          break;
        case "gt":
          query = query.gt(field, value as any);
          break;
        case "lt":
          query = query.lt(field, value as any);
          break;
        case "gte":
          query = query.gte(field, value as any);
          break;
        case "lte":
          query = query.lte(field, value as any);
          break;
        default:
          query = query.eq(field, value as any);
      }
    }

    //Sort bookings by date
    if (sortBy)
      query = query.order(sortBy.field, {
        ascending: sortBy.direction === "asc",
      });

    //pagination
    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error(error);
      throw new Error("Bookings could not be loaded");
    }
    return { data, count };
  },
};

export default bookingsServices;
