import { useParams, Link } from "react-router-dom";
import { usePublicEntry } from "../hooks/usePublicEntries";
import { photoUrl } from "../api/client";
import { formatDateHeader, formatJstDateTime } from "../lib/date-utils";

export default function EntryPage() {
  const { id, username } = useParams<{ id: string; username?: string }>();
  const { data: entry, isLoading } = usePublicEntry(Number(id));

  if (isLoading) {
    return (
      <div className="text-center py-16 text-[var(--c-text-muted)]">
        Loading...
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="text-center py-16 text-red-500">Entry not found</div>
    );
  }

  return (
    <article className="space-y-6">
      <Link
        to={username ? `/${username}` : "/"}
        className="text-sm text-accent hover:underline inline-block"
      >
        &larr; Back
      </Link>

      <header>
        <h2 className="text-lg font-bold text-[var(--c-text-strong)]">
          {formatDateHeader(entry.entry_date)}
        </h2>
        <p className="text-xs text-[var(--c-text-faint)] mt-1">
          {formatJstDateTime(entry.created_at)}
        </p>
      </header>

      {entry.photos.length > 0 && (
        <div className="space-y-3">
          {entry.photos.map((photo) => (
            <figure key={photo.id}>
              <img
                src={photoUrl(photo.id)}
                alt={photo.caption || photo.original_filename || ""}
                className="w-full rounded-xl"
                loading="lazy"
              />
              {photo.caption && (
                <figcaption className="text-sm text-[var(--c-text-muted)] mt-1 text-center">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {entry.text && (
        <p className="text-base text-[var(--c-text)] whitespace-pre-wrap leading-relaxed">
          {entry.text}
        </p>
      )}
    </article>
  );
}
