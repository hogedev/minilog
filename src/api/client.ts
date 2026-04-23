const API_URL = import.meta.env.VITE_API_URL || "/api/v1";

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
}

export function photoUrl(photoId: number, thumb?: boolean): string {
  const w = thumb ? "?w=800" : "";
  return `${API_URL}/public/photos/${photoId}/image${w}`;
}

export function avatarUrl(username: string): string {
  return `${API_URL}/public/users/${username}/avatar`;
}
