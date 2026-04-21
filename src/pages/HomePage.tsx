import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePublicEntries } from "../hooks/usePublicEntries";
import { EntryCard } from "../components/EntryCard";
import { formatDateHeader } from "../lib/date-utils";
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
  username?: string;
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

export default function HomePage() {
  const { username } = useParams<{ username?: string }>();
  const { data, isLoading, error } = usePublicEntries({ username, limit: 50 });

  useEffect(() => {
    if (username) document.title = `${username}日記`;
    return () => {
      document.title = "minilog";
    };
  }, [username]);

  if (isLoading) {
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

  if (!data || data.items.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--c-text-muted)]">
        <p className="text-lg">No entries yet</p>
      </div>
    );
  }

  const groups = groupByDateAndSlot(data.items);

  return (
    <div className="space-y-8">
      {username && (
        <h2 className="text-lg font-semibold text-[var(--c-text-strong)]">
          {username}日記
        </h2>
      )}
      {Array.from(groups.entries()).map(([date, slots]) => (
        <section key={date}>
          <h2 className="text-sm font-semibold text-[var(--c-text-muted)] mb-3 uppercase tracking-wide">
            {formatDateHeader(date)}
          </h2>
          <SlotSection
            slot="morning"
            entries={slots.morning}
            username={username}
          />
          <SlotSection
            slot="afternoon"
            entries={slots.afternoon}
            username={username}
          />
          {slots.unspecified.length > 0 && (
            <div className="space-y-4">
              {slots.unspecified.map((entry) => (
                <EntryCard key={entry.id} entry={entry} username={username} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
