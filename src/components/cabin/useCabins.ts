import { useQuery } from "@tanstack/react-query";
import cabinServices from "@/services/apiCabins";

export const useCabins = () => {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: cabinServices.getCabins,
  });

  return { isLoading, cabins };
};
