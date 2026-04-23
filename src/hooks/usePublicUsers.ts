import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api/client";
import type { PublicUser } from "../types";

export function usePublicUser(username?: string) {
  return useQuery({
    queryKey: ["public", "users", username],
    queryFn: () => fetchApi<PublicUser>(`/public/users/${username}`),
    enabled: !!username,
  });
}
