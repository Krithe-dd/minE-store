import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { productsSlice } from "./products-slice";
import { loginSlice } from "./login-slice";
import { cartItemsSlice } from "./cartItems-slice";
import { wishListSlice } from "./wishlist-slice";
import { ordersSlice } from "./order-slice";
const headerState = { showHeader: true };
const headerSlice = createSlice({
  name: "header",
  initialState: headerState,
  reducers: {
    toggleHeader(state, action) {
      if (action.payload.display === "hide") {
        state.showHeader = false;
      } else {
        state.showHeader = true;
      }
      return state;
    },
  },
});
const portalState = {type:null};
const portalSlice=createSlice({
  name:'portal',
  initialState:portalState,
  reducers:{
    setPortal(state,action){
      if(action.payload.type === 'login'){
        state.type='login'
      }
    }
  }
})


const store = configureStore({
  reducer: {
    cartItems: cartItemsSlice.reducer,
    wishlistItems: wishListSlice.reducer,
    header: headerSlice.reducer,
    products: productsSlice.reducer,
    login: loginSlice.reducer,
    portal:portalSlice.reducer,
    orders:ordersSlice.reducer
  },
});
export const cartActions = cartItemsSlice.actions;
export const wishlistActions = wishListSlice.actions;
export const headerActions = headerSlice.actions;
export const productActions = productsSlice.actions;
export const loginActions = loginSlice.actions;
export const portalActions = portalSlice.actions;
export const ordersActions = ordersSlice.actions;
export default store;
