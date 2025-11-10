import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { FIREBASE_ENDPOINTS } from "../config/firebase";
import FavoriteContext from "../store/FavoritesContext";

export default function EditMeetup() {
  const { meetupId } = useParams();
  const navigate = useNavigate();
  const favoriteContext = useContext(FavoriteContext);
  const [meetupData, setMeetupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadMeetup() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          FIREBASE_ENDPOINTS.meetupById(meetupId)
        );
        if (!response.ok) {
          throw new Error("Failed to load meetup details.");
        }

        const data = await response.json();

        if (!data) {
          throw new Error("Meetup not found or already removed.");
        }

        if (!cancelled) {
          setMeetupData({ id: meetupId, ...data });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load meetup.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMeetup();

    return () => {
      cancelled = true;
    };
  }, [meetupId]);

  async function updateMeetupHandler(updatedData) {
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(FIREBASE_ENDPOINTS.meetupById(meetupId), {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update meetup.");
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to save changes right now.");
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteMeetupHandler() {
    const confirmed = window.confirm(
      "Delete this meetup permanently? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FIREBASE_ENDPOINTS.meetupById(meetupId), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete meetup.");
      }

      favoriteContext.removeFavorite(meetupId);
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to delete meetup right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-brand-500">
          Update meetup
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
          Make adjustments to your event
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-500 dark:text-slate-300">
          Change the copy, fix the venue, or unpublish entirely. When you&apos;re
          done, the public list updates instantly.
        </p>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50/70 p-6 text-red-700 dark:border-red-900 dark:bg-red-900/30 dark:text-red-200">
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-6 py-4 text-slate-600 dark:border-slate-800 dark:text-slate-300">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-slate-900 border-t-transparent dark:border-white dark:border-t-transparent" />
            Loading meetup...
          </div>
        </div>
      ) : meetupData ? (
        <NewMeetupForm
          initialData={meetupData}
          onAddMeetup={updateMeetupHandler}
          isSubmitting={submitting}
          submitLabel="Save changes"
          onDelete={deleteMeetupHandler}
        />
      ) : null}
    </section>
  );
}
