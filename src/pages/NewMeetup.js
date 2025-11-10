import React, { useState } from "react";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useNavigate } from "react-router-dom";
import { FIREBASE_ENDPOINTS } from "../config/firebase";

export default function NewMeetup() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function addMeetupHandler(meetupData) {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(FIREBASE_ENDPOINTS.meetups, {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add meetup.");
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to add meetup. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="space-y-10">
      <div className="rounded-[32px] border border-slate-200 bg-white/90 p-10 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-brand-500">
          Host mode
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 dark:text-white">
          Launch a meetup in minutes
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-500 dark:text-slate-300">
          Share your idea, set the scene, and open the doors. We&apos;ll add it
          to the discovery feed so the right people can find you.
        </p>
        <div className="mt-6 grid gap-4 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
          {[
            { title: "Describe it", detail: "A bold title + 2 sentence teaser" },
            { title: "Set the vibe", detail: "Add the venue, city, or remote" },
            { title: "Publish", detail: "Share instantly with the community" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/70 bg-white/60 p-4 dark:border-slate-700 dark:bg-slate-900/40"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50/70 p-6 text-red-700 dark:border-red-900 dark:bg-red-900/30 dark:text-red-200">
          <p className="text-sm font-semibold">We couldn&apos;t publish that.</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <NewMeetupForm onAddMeetup={addMeetupHandler} isSubmitting={submitting} />
    </section>
  );
}
