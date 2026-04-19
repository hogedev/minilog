import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api/client";

interface SiteSettings {
  site_name: string;
  site_description: string;
}

export function useSiteSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["public", "settings"],
    queryFn: () => fetchApi<SiteSettings>("/public/settings"),
    staleTime: 5 * 60 * 1000,
  });

  return {
    siteName: data?.site_name ?? "minilog",
    siteDescription: data?.site_description ?? "",
    isLoading,
  };
}
