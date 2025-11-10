import React, { useContext } from "react";
import { Link } from "react-router-dom";
import FavoriteContext from "../store/FavoritesContext";
import MeetupList from "../components/meetups/MeetupList";

export default function Favorites() {
  const favoritesContext = useContext(FavoriteContext);
  const hasFavorites = favoritesContext.totalFavorites > 0;

  return (
    <section className="space-y-10">
      <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-brand-500">
          Saved for later
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
          Your curated favorites
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-500 dark:text-slate-300">
          Keep track of the meetups that inspire you. Favoriting a meetup saves
          it to this board so you can RSVP when the time is right.
        </p>
      </div>

      {hasFavorites ? (
        <MeetupList
          meetups={favoritesContext.favorites}
          title="Pinned favorites"
          subtitle="Hand-picked by you"
          emptyMessage="You haven’t saved any meetups yet."
        />
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/50 p-12 text-center dark:border-slate-800 dark:bg-slate-900/40">
          <p className="text-lg font-semibold text-slate-700 dark:text-white">
            Nothing here yet.
          </p>
          <p className="mt-2 text-slate-500 dark:text-slate-300">
            Browse upcoming meetups and tap &ldquo;Add to favorites&rdquo; to
            collect them here.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
          >
            Explore meetups
          </Link>
        </div>
      )}
    </section>
  );
}
