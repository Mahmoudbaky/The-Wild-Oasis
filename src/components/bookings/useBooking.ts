import { useQuery } from "@tanstack/react-query";
import bookingsServices from "@/services/apiBookings.ts";

export const useBookings = () => {
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: bookingsServices.getBookings,
  });

  return { isLoading, bookings };
};
