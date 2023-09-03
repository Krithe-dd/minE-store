import { createSlice } from "@reduxjs/toolkit";

const productsState = { initialItems:[],items: [],noResults:false,rating:null,price:0 };
export const productsSlice = createSlice({
  name: "products",
  initialState: productsState,
  reducers: {
    setItems(state, action) {
      state.items = [...action.payload];
      state.initialItems = [...action.payload];
    },
    setRatingFilter(state, action) {
        state.rating = action.payload;
      },
      setPriceFilter(state, action) {
        state.price = action.payload;
      },
      clearFilter(state) {
        state.rating = null;
        state.price = 0;
        state.items = state.initialItems;
        state.noResults=false;
      },
      applyFilter(state) {
        state.items = state.initialItems.filter(product =>(product.rating.rate || product.rating) > state.rating && product.price > state.price)
        if(state.items.length === 0){
          state.noResults=true;
        } else{
          state.noResults=false
        }
    }
  },
});