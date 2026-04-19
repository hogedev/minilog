import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api/client";
import type { Entry, PaginatedResponse } from "../types";

interface ListParams {
  username?: string;
  offset?: number;
  limit?: number;
  date_from?: string;
  date_to?: string;
}

export function usePublicEntries(params?: ListParams) {
  const sp = new URLSearchParams();
  if (params?.username) sp.set("username", params.username);
  if (params?.offset) sp.set("offset", String(params.offset));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.date_from) sp.set("date_from", params.date_from);
  if (params?.date_to) sp.set("date_to", params.date_to);
  const qs = sp.toString();

  return useQuery({
    queryKey: ["public", "entries", params],
    queryFn: () =>
      fetchApi<PaginatedResponse<Entry>>(
        `/public/entries${qs ? `?${qs}` : ""}`,
      ),
  });
}

export function usePublicEntry(id: number) {
  return useQuery({
    queryKey: ["public", "entries", id],
    queryFn: () => fetchApi<Entry>(`/public/entries/${id}`),
    enabled: id > 0,
  });
}

export function usePublicDates(
  username?: string,
  year?: number,
  month?: number,
) {
  const sp = new URLSearchParams();
  if (username) sp.set("username", username);
  if (year) sp.set("year", String(year));
  if (month) sp.set("month", String(month));
  const qs = sp.toString();

  return useQuery({
    queryKey: ["public", "dates", username, year, month],
    queryFn: () =>
      fetchApi<string[]>(`/public/entries/dates${qs ? `?${qs}` : ""}`),
  });
}
