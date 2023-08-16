import React, { useContext } from "react";

import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import FavoriteContext from "../../store/FavoritesContext";
export default function MeetupItem(props) {
  const favoriteContext = useContext(FavoriteContext);

  const itemIsFavorite = favoriteContext.itemIsFavorite(props.id);
  function toggleFavHandler() {
    if (itemIsFavorite) {
      favoriteContext.removeFavorite(props.id);
    } else {
      favoriteContext.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavHandler}>
            {itemIsFavorite ? "Remove from Favorite" : "Add To Favorite"}
          </button>
        </div>
      </Card>
    </li>
  );
}
