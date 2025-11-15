import { useQuery } from "@tanstack/react-query";
import settingsServices from "@/services/apiSettings";

export const useSettings = () => {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: settingsServices.getSettings,
  });

  return { settings, isLoading, error };
};
