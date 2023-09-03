import { createSlice } from "@reduxjs/toolkit";
import { ordersActions } from ".";
import { json } from "react-router-dom";

const initialOrdersState = { orders: [] };
export const ordersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {
    addOrder(state, action) {
      const { payload } = action;
      state.orders = payload;
    },
  },
});
export const ordersData = (userId, cartList,totalPrice,date) => {
  let singleOrder = {
    items:cartList,
    cost:`${totalPrice >=100 ? totalPrice : totalPrice+20}`,
    date
  }
  return async (dispatch) => {
    const fetchOrders = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/users/${userId}/.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Error placing order");
      }
      return data;
    };
    const updateOrders = async (orderedItems) => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_API}/users/${userId}/.json`,
        {
          method: "PUT",
          body: JSON.stringify(orderedItems),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data =await res.json()
      dispatch(ordersActions.addOrder(data.orders))
    };
    try {
      let ordersFetched = await fetchOrders();
      let ordersModified = {
        ...ordersFetched,
        orders: [...(ordersFetched.orders || []),singleOrder]
      };
      await updateOrders(ordersModified);
    } catch (err) {
      throw json(err);
    }
  };
};
