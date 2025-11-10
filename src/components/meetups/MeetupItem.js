import React, { useContext } from "react";
import Card from "../ui/Card";
import FavoriteContext from "../../store/FavoritesContext";

export default function MeetupItem({
  id,
  title,
  image,
  address,
  description,
  onTogglePin,
  isPinned,
  onEdit,
  onDelete,
  isDeleting = false,
}) {
  const favoriteContext = useContext(FavoriteContext);
  const itemIsFavorite = favoriteContext.itemIsFavorite(id);
  const managementActions = Boolean(onEdit || onDelete);

  function toggleFavHandler() {
    if (itemIsFavorite) {
      favoriteContext.removeFavorite(id);
    } else {
      favoriteContext.addFavorite({
        id,
        title,
        description,
        image,
        address,
      });
    }
  }

  return (
    <li>
      <Card
        className={`flex h-full flex-col overflow-hidden transition ${
          isPinned ? "ring-2 ring-amber-400" : "hover:-translate-y-1 hover:shadow-2xl"
        }`}
      >
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          {isPinned && (
            <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-amber-400/90 px-3 py-1 text-xs font-semibold text-amber-900">
              📌 Pinned
            </span>
          )}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              Meetup
            </p>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
          <div className="space-y-4 text-left">
            <address className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-500 not-italic">
              <span>📍</span>
              {address}
            </address>
            <p className="text-base text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={toggleFavHandler}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition sm:flex-none ${
                itemIsFavorite
                  ? "border-brand-500 bg-brand-500 text-white shadow-brand-500/40 hover:bg-brand-600"
                  : "border-slate-200 bg-white text-slate-700 hover:border-brand-200 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              }`}
            >
              {itemIsFavorite ? "Favorited" : "Add to Favorites"}
            </button>
            {onTogglePin && (
              <button
                onClick={() => onTogglePin(id)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-300/70 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 dark:border-amber-600/40 dark:bg-amber-500/10 dark:text-amber-200 sm:flex-none"
              >
                {isPinned ? "Unpin Card" : "Pin Card"}
              </button>
            )}
            {managementActions && (
              <div className="flex flex-1 flex-wrap gap-3 sm:flex-none">
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(id)}
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:flex-none"
                  >
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => onDelete(id)}
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-500/30 dark:bg-red-900/30 dark:text-red-200 sm:flex-none"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </li>
  );
}
