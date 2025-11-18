import { useQuery } from "@tanstack/react-query";
import bookingsServices from "@/services/apiBookings.ts";
import { useSearchParams } from "react-router";

export const useBookings = () => {
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

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => bookingsServices.getBookings({ filter, sortBy }),
  });

  return { isLoading, bookings };
};
