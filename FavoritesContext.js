// FavoritesContext.js
import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Add a launch to favorites if not already present
  const addFavorite = (launch) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === launch.id)) {
        return [...prev, launch];
      }
      return prev;
    });
  };

  // Remove a launch from favorites
  const removeFavorite = (launch) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== launch.id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
