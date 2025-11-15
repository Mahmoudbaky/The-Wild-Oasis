import { useMutation, useQueryClient } from "@tanstack/react-query";
import settingsServices from "@/services/apiSettings.ts";
import { toast } from "sonner";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: settingsServices.updateSettings,
    onSuccess: () => {
      toast.success("Settings Edited Successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  return { updateSettings, isUpdating };
};
