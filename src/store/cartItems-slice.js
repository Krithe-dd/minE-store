import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const cartState = { items: [], total: 0, price: 0 };
export const cartItemsSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    addItemToCart(state, action) {
      const { payload } = action;
      if(payload.type === "INIT"){
          if(!payload.cartItems)return
        state.items = payload.cartItems;
        state.total = payload.cartItems.reduce((acc,item)=>{
            return acc+item.quantity
        },0) 
        state.price = payload.cartItems.reduce((acc,item)=>{
            return acc+ (item.price * item.quantity)
        },0)
        return;
      }
      const { items } = state;
      const existingItem = items.find((item) => item.id === payload.id);
      if (existingItem) {
        existingItem.quantity = existingItem.quantity + payload.quantity;
        state.total = state.total + payload.quantity;
        state.price = state.price + payload.price * payload.quantity;
      } else {
        state.items = [...state.items, payload];
        state.total = state.total + payload.quantity;
        state.price = state.price + payload.price * payload.quantity;
      }
    },
    removeItemFromCart(state, action) {
      const { payload } = action;
      const { items } = state;
      const existingItem = items.find((item) => item.id === payload.id);
      state.total = state.total - 1;
      state.price = state.price - existingItem.price;
      if (existingItem.quantity > 1) {
        existingItem.quantity = existingItem.quantity - 1;
      } else {
        state.items = items.filter((item) => item.id !== payload.id);
      }
    },
    replaceCart(){
        return cartState
    }
  },
});
export const sendCartData = (cart, currentUserID,currentUser) => {
  return async () => {
    const updateCartData = async()=>{
        const res = await fetch(
            `${process.env.REACT_APP_BACKEND_API}/users/${currentUserID}.json`
            ,{
                method:'PATCH',
                body:JSON.stringify({
                cartItems:cart}),
                headers: {
                    "Content-Type": "application/json",
                  },
            }
          );
          if(!res.ok){
            throw new Error('Error updating the cart')
          }
           const data =await res.json();
          return data
    }
    try {
      await updateCartData()
      
    } catch (err) {
        throw json(err)
    }
  };
};
