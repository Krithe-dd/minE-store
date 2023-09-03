import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const wishlistState = { items: [] };
export const wishListSlice = createSlice({
  name: "wishlist",
  initialState: wishlistState,
  reducers: {
    addItemToList(state, action) {
      const { payload } = action;
      if (payload.type === "INIT") {
        if (!payload.wishlistItems) return;
        state.items = payload.wishlistItems;
        return;
      }
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return;
      }
      state.items = [...state.items, action.payload];
    },
    removeItemFromList(state, action) {
      const { payload } = action;
      const { items } = state;
      state.items = items.filter((item) => item.id !== payload.id);
    },
    replaceWishlist() {
      return wishlistState;
    },
  }, 
});
export const sendWishlistData = (wishList,currentUser,currentUserId) => {
  return async () => {
    const updateWishlistData = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/users/${currentUserId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            wishlistItems: wishList,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error updating the cart");
      }
      const data =await res.json();
          return data
    };
    try {
      await updateWishlistData();
    } catch (err) {
        throw json(err)
    }
  };
};
