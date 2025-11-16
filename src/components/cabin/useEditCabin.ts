import { useMutation, useQueryClient } from "@tanstack/react-query";
import cabinServices from "@/services/apiCabins";
import { toast } from "sonner";
import type { EditCabinFormData } from "@/types";



export const useEditCabin = () => {
  const queryClient = useQueryClient();

  // Edit cabin mutation
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: Partial<EditCabinFormData>;
      id: number;
    }) => cabinServices.editCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin Edited Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
};
