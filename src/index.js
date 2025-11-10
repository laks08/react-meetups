import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FavoritesContextProvider } from "./store/FavoritesContext";
import { ThemeProvider } from "./store/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <FavoritesContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
