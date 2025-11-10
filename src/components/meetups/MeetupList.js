import React from "react";
import MeetupItem from "./MeetupItem";

export default function MeetupList({
  meetups,
  title,
  subtitle,
  emptyMessage = "No meetups yet",
  pinnedIds = [],
  onTogglePin,
  onEdit,
  onDelete,
  deletingId,
}) {
  return (
    <div className="space-y-6">
      {title && (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            {subtitle && (
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-brand-500">
                {subtitle}
              </p>
            )}
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>
          <span className="inline-flex h-10 items-center rounded-full border border-slate-200 px-4 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-200">
            {meetups.length} meetup{meetups.length === 1 ? "" : "s"}
          </span>
        </div>
      )}

      {meetups.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-12 text-center text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
          {emptyMessage}
        </div>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2">
          {meetups.map((meetup) => (
            <MeetupItem
              key={meetup.id}
              {...meetup}
              isPinned={pinnedIds.includes(meetup.id)}
              onTogglePin={onTogglePin}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={deletingId === meetup.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
