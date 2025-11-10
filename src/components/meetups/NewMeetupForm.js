import React, { useEffect, useState } from "react";
import Card from "../ui/Card";

const emptyMeetup = {
  title: "",
  image: "",
  address: "",
  description: "",
};

export default function NewMeetupForm({
  onAddMeetup,
  isSubmitting,
  initialData = null,
  submitLabel = "Publish Meetup",
  onDelete,
}) {
  const [formValues, setFormValues] = useState(emptyMeetup);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormValues({
        title: initialData.title || "",
        image: initialData.image || "",
        address: initialData.address || "",
        description: initialData.description || "",
      });
    } else {
      setFormValues(emptyMeetup);
    }
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }

  function submitHandler(event) {
    event.preventDefault();
    onAddMeetup(formValues);
  }

  const inputClasses =
    "w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 disabled:opacity-70 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-400 dark:focus:ring-brand-900/50";

  return (
    <Card className="p-6 sm:p-10">
      <form className="space-y-10" onSubmit={submitHandler}>
        <div className="space-y-3 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-brand-500">
            {isEditMode ? "Edit meetup" : "Create Meetup"}
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
            {isEditMode
              ? "Refresh the details"
              : "Tell the community about your next gathering"}
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-300">
            Provide a standout image, the venue, and a short description so
            people know why they should attend.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Meetup Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formValues.title}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Design Systems Roundtable"
            />
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Keep it short, punchy, and memorable.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="image"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Cover Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              required
              value={formValues.image}
              onChange={handleChange}
              className={inputClasses}
              placeholder="https://images.unsplash.com/..."
            />
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Use a high-quality landscape photo (1200×800 recommended).
            </p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="address"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Location
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              value={formValues.address}
              onChange={handleChange}
              className={inputClasses}
              placeholder="123 Mission Street, San Francisco"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            What&apos;s happening?
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            required
            value={formValues.description}
            onChange={handleChange}
            className={`${inputClasses} min-h-[140px]`}
            placeholder="Share the schedule, who will be there, and why it matters."
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {isEditMode
              ? "Need to remove it entirely? You can delete this meetup below."
              : "Once published, you can edit or archive a meetup anytime."}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-500/40 dark:bg-red-900/20 dark:text-red-200"
              >
                Delete meetup
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent dark:border-slate-900 dark:border-t-transparent" />
                  Saving
                </>
              ) : (
                submitLabel
              )}
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
}
