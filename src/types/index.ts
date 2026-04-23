export interface Photo {
  id: number;
  original_filename: string | null;
  width: number | null;
  height: number | null;
  content_type: string | null;
  caption: string | null;
  created_at: string;
}

export interface EntryAuthor {
  username: string;
  display_name: string | null;
  has_avatar: boolean;
}

export interface Entry {
  id: number;
  text: string | null;
  entry_date: string;
  is_public: boolean;
  time_slot: "morning" | "afternoon" | null;
  photos: Photo[];
  created_at: string;
  updated_at: string;
  author: EntryAuthor | null;
}

export interface PublicUser {
  username: string;
  display_name: string | null;
  bio: string | null;
  has_avatar: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
}
