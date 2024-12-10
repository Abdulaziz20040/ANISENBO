import React, { createContext, useContext, useState } from "react";
import { CiBookmarkPlus } from "react-icons/ci";

// Context yaratish
const ProductContext = createContext(null);

// Context Provider
const ProductContextProvider = ({ children }) => {
  const [favorite, setFavorite] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Mahsulotni favorites-ga qo'shish
  const addToFavorite = (product) => {
    const isProductInFavorites = favorite.some(
      (item) => item.id === product.id
    );
    if (!isProductInFavorites) {
      const updatedFavorites = [...favorite, product];
      setFavorite(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Favouritesdan o'chirish
  const deleteFromFavorite = (productId) => {
    const updatedFavorites = favorite.filter((item) => item.id !== productId);
    setFavorite(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  return (
    <ProductContext.Provider
      value={{
        favorite,
        addToFavorite,
        deleteFromFavorite,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProduct = () => {
  return useContext(ProductContext);
};

// Providerni eksport qilish
export default ProductContextProvider;
