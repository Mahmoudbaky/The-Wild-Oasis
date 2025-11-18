import { useQuery } from "@tanstack/react-query";
import bookingsServices from "@/services/apiBookings.ts";
import { useSearchParams } from "react-router";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("status");

  const filter =
    !statusFilter || statusFilter === "all"
      ? null
      : {
          field: "status",
          value: statusFilter,
        };

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => bookingsServices.getBookings({ filter, sortBy: "" }),
  });

  return { isLoading, bookings };
};
