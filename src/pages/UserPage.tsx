import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePublicEntries } from "../hooks/usePublicEntries";
import { usePublicUser } from "../hooks/usePublicUsers";
import { EntryCard } from "../components/EntryCard";
import { formatDateHeader } from "../lib/date-utils";
import { avatarUrl } from "../api/client";
import type { Entry } from "../types";

interface TimeSlotGroup {
  morning: Entry[];
  afternoon: Entry[];
  unspecified: Entry[];
}

function groupByDateAndSlot(entries: Entry[]): Map<string, TimeSlotGroup> {
  const groups = new Map<string, TimeSlotGroup>();
  for (const entry of entries) {
    const date = entry.entry_date;
    if (!groups.has(date))
      groups.set(date, { morning: [], afternoon: [], unspecified: [] });
    const group = groups.get(date)!;
    if (entry.time_slot === "morning") group.morning.push(entry);
    else if (entry.time_slot === "afternoon") group.afternoon.push(entry);
    else group.unspecified.push(entry);
  }
  return groups;
}

const SLOT_LABEL: Record<string, string> = {
  morning: "午前",
  afternoon: "午後",
};

function SlotSection({
  slot,
  entries,
  username,
}: {
  slot: string;
  entries: Entry[];
  username: string;
}) {
  if (entries.length === 0) return null;
  return (
    <>
      <h3 className="text-xs font-semibold text-[var(--c-text-faint)] mt-2 mb-1">
        {SLOT_LABEL[slot] ?? ""}
      </h3>
      <div className="space-y-4">
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} username={username} />
        ))}
      </div>
    </>
  );
}

export default function UserPage() {
  const { username } = useParams<{ username: string }>();
  const { data: user, isLoading: userLoading } = usePublicUser(username);
  const { data, isLoading, error } = usePublicEntries({
    username,
    limit: 50,
  });

  useEffect(() => {
    if (user) {
      document.title = `${user.display_name || user.username}の日記`;
    }
    return () => {
      document.title = "minilog";
    };
  }, [user]);

  if (isLoading || userLoading) {
    return (
      <div className="text-center py-16 text-[var(--c-text-muted)]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        Failed to load entries
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* プロフィールヘッダー */}
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-16 h-16 rounded-full bg-[var(--c-surface-1)] border border-border overflow-hidden">
          {user?.has_avatar ? (
            <img
              src={avatarUrl(username!)}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-2xl font-bold text-[var(--c-text-muted)]">
              {(user?.display_name || username || "?")[0]?.toUpperCase()}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[var(--c-text-strong)]">
            {user?.display_name || username}
          </h2>
          {user?.display_name && (
            <p className="text-sm text-[var(--c-text-faint)]">@{username}</p>
          )}
          {user?.bio && (
            <p className="text-sm text-[var(--c-text)] mt-1 whitespace-pre-wrap">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* エントリ一覧 */}
      {!data || data.items.length === 0 ? (
        <div className="text-center py-8 text-[var(--c-text-muted)]">
          <p>まだ記事がありません</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Array.from(groupByDateAndSlot(data.items).entries()).map(
            ([date, slots]) => (
              <section key={date}>
                <h2 className="text-sm font-semibold text-[var(--c-text-muted)] mb-3 uppercase tracking-wide">
                  {formatDateHeader(date)}
                </h2>
                <SlotSection
                  slot="morning"
                  entries={slots.morning}
                  username={username!}
                />
                <SlotSection
                  slot="afternoon"
                  entries={slots.afternoon}
                  username={username!}
                />
                {slots.unspecified.length > 0 && (
                  <div className="space-y-4">
                    {slots.unspecified.map((entry) => (
                      <EntryCard
                        key={entry.id}
                        entry={entry}
                        username={username}
                      />
                    ))}
                  </div>
                )}
              </section>
            ),
          )}
        </div>
      )}
    </div>
  );
}
