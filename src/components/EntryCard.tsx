import { Link } from "react-router-dom";
import { photoUrl } from "../api/client";
import { formatJstTime } from "../lib/date-utils";
import type { Entry } from "../types";

export function EntryCard({ entry }: { entry: Entry }) {
  const hasPhotos = entry.photos.length > 0;
  const time = formatJstTime(entry.created_at);

  return (
    <Link
      to={`/entries/${entry.id}`}
      className="block bg-surface-1 rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow"
    >
      {hasPhotos && (
        <div className="flex gap-px overflow-hidden">
          {entry.photos.slice(0, 3).map((photo) => (
            <img
              key={photo.id}
              src={photoUrl(photo.id, true)}
              alt=""
              className="h-48 flex-1 object-cover min-w-0"
              loading="lazy"
            />
          ))}
          {entry.photos.length > 3 && (
            <div className="h-48 w-16 bg-surface-2 flex items-center justify-center text-sm text-[var(--c-text-muted)]">
              +{entry.photos.length - 3}
            </div>
          )}
        </div>
      )}
      <div className="p-4">
        {entry.text && (
          <p className="text-sm text-[var(--c-text)] leading-relaxed line-clamp-3">
            {entry.text}
          </p>
        )}
        <p className="text-xs text-[var(--c-text-faint)] mt-2">{time}</p>
      </div>
    </Link>
  );
}
