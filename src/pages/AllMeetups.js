import "../App.css";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import MeetupList from "../components/meetups/MeetupList";
import FavoriteContext from "../store/FavoritesContext";
import { FIREBASE_ENDPOINTS } from "../config/firebase";

export default function AllMeetups() {
  const favoriteContext = useContext(FavoriteContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [mutationMessage, setMutationMessage] = useState(null);
  const [pinnedMeetupIds, setPinnedMeetupIds] = useState(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const stored = localStorage.getItem("meetups-pinned");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem("meetups-pinned", JSON.stringify(pinnedMeetupIds));
  }, [pinnedMeetupIds]);

  const loadMeetups = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(FIREBASE_ENDPOINTS.meetups);

      if (!response.ok) {
        throw new Error("Failed to load meetups.");
      }

      const data = await response.json();

      if (!data) {
        setLoadedMeetups([]);
        setPinnedMeetupIds([]);
        return;
      }

      const meetups = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setLoadedMeetups(meetups);
      setPinnedMeetupIds((prev) =>
        prev.filter((id) => meetups.some((meetup) => meetup.id === id))
      );
    } catch (err) {
      setError(err.message || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeetups();
  }, [loadMeetups]);

  const filteredMeetups = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return loadedMeetups;
    }

    return loadedMeetups.filter((meetup) => {
      const haystack = `${meetup.title} ${meetup.address} ${meetup.description}`.toLowerCase();
      return haystack.includes(normalizedSearch);
    });
  }, [loadedMeetups, searchTerm]);

  const pinnedMeetups = filteredMeetups.filter((meetup) =>
    pinnedMeetupIds.includes(meetup.id)
  );
  const regularMeetups = filteredMeetups.filter(
    (meetup) => !pinnedMeetupIds.includes(meetup.id)
  );

  const heroStats = [
    { label: "Live meetups", value: loadedMeetups.length },
    { label: "Pinned cards", value: pinnedMeetupIds.length },
    { label: "Favorites", value: favoriteContext.totalFavorites },
  ];

  function handleTogglePin(meetupId) {
    setPinnedMeetupIds((prev) =>
      prev.includes(meetupId)
        ? prev.filter((id) => id !== meetupId)
        : [...prev, meetupId]
    );
  }

  function handleEditMeetup(meetupId) {
    navigate(`/meetups/${meetupId}/edit`);
  }

  async function handleDeleteMeetup(meetupId) {
    const confirmed = window.confirm(
      "Delete this meetup permanently? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(meetupId);
    setMutationMessage(null);

    try {
      const response = await fetch(FIREBASE_ENDPOINTS.meetupById(meetupId), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete meetup.");
      }

      setLoadedMeetups((prev) =>
        prev.filter((meetup) => meetup.id !== meetupId)
      );
      setPinnedMeetupIds((prev) => prev.filter((id) => id !== meetupId));
      favoriteContext.removeFavorite(meetupId);
      setMutationMessage({
        type: "success",
        text: "Meetup deleted successfully.",
      });
    } catch (err) {
      setMutationMessage({
        type: "error",
        text: err.message || "Unable to delete meetup.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  const heroSection = (
    <section className="relative mb-12 overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-2xl shadow-slate-900/40 sm:p-10 lg:p-12">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl"></div>
      <div className="relative flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
            Curated for builders
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Discover meetups, save your favorites, and pin what matters.
          </h1>
          <p className="text-base text-white/70">
            All the community energy in one place—filter by interest, pin the
            cards you want to revisit, and jump back in anytime.
          </p>
        </div>
        <Link
          to="/new-meetup"
          className="inline-flex items-center justify-center rounded-3xl bg-white px-8 py-4 text-lg font-semibold text-slate-900 transition hover:-translate-y-1 hover:bg-slate-100 lg:justify-self-end"
        >
          ✨ Create a meetup
        </Link>
      </div>
      <div className="relative mt-10 grid gap-4 text-left sm:grid-cols-3">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl bg-white/10 p-5 shadow-inner shadow-black/20"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="relative mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-3xl bg-white/10 px-5 py-3 text-base">
          <span className="text-white/70">🔍</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search for a city, topic, or host..."
            className="flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="text-sm font-semibold text-white/60 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm lg:justify-end">
          <span className="rounded-full bg-white/10 px-4 py-2 text-white/70">
            {filteredMeetups.length} results
          </span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-white/70">
            {pinnedMeetupIds.length} pinned
          </span>
        </div>
      </div>
    </section>
  );

  if (loading) {
    return (
      <section className="space-y-12">
        {heroSection}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-3 rounded-3xl border border-slate-200/60 bg-white/60 px-6 py-4 text-slate-600 shadow-lg dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-300">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent dark:border-white dark:border-t-transparent"></span>
            Fetching meetups...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-12">
        {heroSection}
        <div className="rounded-3xl border border-red-200 bg-red-50/80 p-8 text-center text-red-700 dark:border-red-900 dark:bg-red-900/30 dark:text-red-200">
          <h2 className="text-2xl font-semibold">We couldn&apos;t load meetups</h2>
          <p className="mt-2 text-red-600 dark:text-red-100">{error}</p>
          <button
            type="button"
            onClick={loadMeetups}
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
          >
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-12">
      {heroSection}

      {mutationMessage && (
        <div
          className={`rounded-3xl border px-6 py-4 text-sm font-medium ${
            mutationMessage.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-900/30 dark:text-red-200"
          }`}
        >
          {mutationMessage.text}
        </div>
      )}

      {pinnedMeetups.length > 0 && (
        <MeetupList
          meetups={pinnedMeetups}
          title="Pinned spotlight"
          subtitle="Stay focused"
          pinnedIds={pinnedMeetupIds}
          onTogglePin={handleTogglePin}
          onEdit={handleEditMeetup}
          onDelete={handleDeleteMeetup}
          deletingId={deletingId}
          emptyMessage="No pinned meetups yet."
        />
      )}

      <MeetupList
        meetups={regularMeetups}
        title="All meetups"
        subtitle="Curated for you"
        pinnedIds={pinnedMeetupIds}
        onTogglePin={handleTogglePin}
        onEdit={handleEditMeetup}
        onDelete={handleDeleteMeetup}
        deletingId={deletingId}
        emptyMessage="No meetups match your filters."
      />
    </section>
  );
}
