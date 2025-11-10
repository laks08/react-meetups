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
    <section>
      <h1>Add New Meetup</h1>
      {error && <p>{error}</p>}
      <NewMeetupForm onAddMeetup={addMeetupHandler} isSubmitting={submitting} />
    </section>
  );
}
