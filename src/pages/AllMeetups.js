import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

export default function AllMeetups() {
  const [loading, setLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(
  //     "https://react-meetups-71be7-default-rtdb.firebaseio.com/meetups.json"
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       const meetups = [];
  //       for (const key in data) {
  //         const meetup = {
  //           id: key,
  //           ...data[key],
  //         };
  //         meetups.push(meetup);
  //       }

  //       setLoading(false);
  //       setLoadedMeetups(meetups);
  //     });
  // }, []);

  useEffect(() => {
    const fetchMeetups = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://react-meetups-71be7-default-rtdb.firebaseio.com/meetups.json"
        );
        const data = await response.json();

        const meetups = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setLoading(false);
        setLoadedMeetups(meetups);
      } catch (error) {
        // Handle error
        setLoading(false);
      }
    };

    fetchMeetups();
  }, []);

  if (loading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}
