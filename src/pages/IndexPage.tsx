import { usePublicEntries } from "../hooks/usePublicEntries";
import { EntryCard } from "../components/EntryCard";
import { formatDateHeader } from "../lib/date-utils";
import type { Entry } from "../types";

function groupByDate(entries: Entry[]): Map<string, Entry[]> {
  const groups = new Map<string, Entry[]>();
  for (const entry of entries) {
    const date = entry.entry_date;
    if (!groups.has(date)) groups.set(date, []);
    groups.get(date)!.push(entry);
  }
  return groups;
}

export default function IndexPage() {
  const { data, isLoading, error } = usePublicEntries({ limit: 50 });

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

  const groups = groupByDate(data.items);

  return (
    <div className="space-y-8">
      {Array.from(groups.entries()).map(([date, entries]) => (
        <section key={date}>
          <h2 className="text-sm font-semibold text-[var(--c-text-muted)] mb-3 uppercase tracking-wide">
            {formatDateHeader(date)}
          </h2>
          <div className="space-y-4">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} showAuthor />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
