import React from "react";
import classes from "./MyOrders.module.css";
import Orders from "../components/Orders";
import { useSelector } from "react-redux";
const MyOrders = () => {
  const {orders} = useSelector(state=>state.orders)
  return (
    <div className={classes.orders}>
      {!orders && <h4>No orders found</h4>}
      <Orders/>
    </div>
  );
};

export default MyOrders;
