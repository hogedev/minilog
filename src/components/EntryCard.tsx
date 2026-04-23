import { Link } from "react-router-dom";
import { photoUrl, avatarUrl } from "../api/client";
import { formatJstTime } from "../lib/date-utils";
import type { Entry } from "../types";

function AuthorAvatar({
  username,
  displayName,
  hasAvatar,
}: {
  username: string;
  displayName: string | null;
  hasAvatar: boolean;
}) {
  return (
    <Link
      to={`/${username}`}
      className="shrink-0 w-8 h-8 rounded-full bg-[var(--c-surface-2)] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {hasAvatar ? (
        <img
          src={avatarUrl(username)}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="flex items-center justify-center w-full h-full text-xs font-bold text-[var(--c-text-muted)]">
          {(displayName || username)[0]?.toUpperCase()}
        </span>
      )}
    </Link>
  );
}

export function EntryCard({
  entry,
  username,
  showAuthor = false,
}: {
  entry: Entry;
  username?: string;
  showAuthor?: boolean;
}) {
  const hasPhotos = entry.photos.length > 0;
  const time = formatJstTime(entry.created_at);
  const author = entry.author;
  const resolvedUsername = username || author?.username;
  const linkTo = resolvedUsername
    ? `/${resolvedUsername}/${entry.id}`
    : `/entries/${entry.id}`;

  return (
    <div className="bg-surface-1 rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow">
      {showAuthor && author && (
        <div className="flex items-center gap-2 px-4 pt-3">
          <AuthorAvatar
            username={author.username}
            displayName={author.display_name}
            hasAvatar={author.has_avatar}
          />
          <Link
            to={`/${author.username}`}
            className="text-sm font-semibold text-[var(--c-text-strong)] hover:underline"
          >
            {author.display_name || author.username}
          </Link>
          {author.display_name && (
            <span className="text-xs text-[var(--c-text-faint)]">
              @{author.username}
            </span>
          )}
        </div>
      )}
      <Link to={linkTo} className="block">
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
    </div>
  );
}
