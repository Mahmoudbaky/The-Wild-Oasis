import { useMutation, useQueryClient } from "@tanstack/react-query";
import cabinServices from "@/services/apiCabins";
import { toast } from "sonner";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  // Create cabin mutation
  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: cabinServices.createCabin,
    onSuccess: () => {
      toast.success("Cabin Created Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
};
