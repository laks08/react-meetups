import React, { useContext } from "react";
import FavoriteContext from "../store/FavoritesContext";
import MeetupList from "../components/meetups/MeetupList";

export default function Favorites() {
  const favoritesContext = useContext(FavoriteContext);

  let content;

  if (favoritesContext.totalFavorites === 0) {
    content = <p>Start Adding Favorites</p>;
  } else {
    content = <MeetupList meetups={favoritesContext.favorites} />;
  }
  return (
    <section>
      <h1>My Favorites</h1>
      {content}
    </section>
  );
}
