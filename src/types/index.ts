export interface Photo {
  id: number;
  original_filename: string | null;
  width: number | null;
  height: number | null;
  content_type: string | null;
  created_at: string;
}

export interface Entry {
  id: number;
  text: string | null;
  entry_date: string;
  is_public: boolean;
  photos: Photo[];
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  offset: number;
  limit: number;
}
