import { useQuery, useQueryClient } from "@tanstack/react-query";
import bookingsServices from "@/services/apiBookings.ts";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "@/lib/constants";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("status");
  // filter bookings based on status
  const filter =
    !statusFilter || statusFilter === "all"
      ? null
      : {
          field: "status",
          value: statusFilter,
        };

  //Sort bookings by date
  const sortByRaw = searchParams.get("sort") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {
    field,
    direction,
  };

  // pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //Query bookings
  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => bookingsServices.getBookings({ filter, sortBy, page }),
  });

  //prefetch bookings count for pagination
  const pageCount = Math.ceil(count! / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () =>
        bookingsServices.getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () =>
        bookingsServices.getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, count };
};
