import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./Cart.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../store";
import Address from "../components/Address";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import OrderPlaced from "../components/OrderPlaced";
import { ordersData } from "../store/order-slice";
export const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();
  const { userId, userAddress } = useSelector((state) => state.login);
  const cartList = useSelector((state) => state.cartItems.items);
  const totalPrice = useSelector((state) => state.cartItems.price);
  const totalItems = cartList.reduce((acc, item) => acc + item.quantity, 0);
  const addItemHandler = (item) => {
    dispatch(cartActions.addItemToCart({ ...item, quantity: 1 }));
  };
  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItemFromCart({ id }));
  };

  const placeOrder = async () => {
    let date = new Date().toLocaleDateString();
    dispatch(ordersData(userId, cartList, totalPrice, date));
    dispatch(cartActions.replaceCart());
    setOrderPlaced(true);
  };

  return (
    <div className={classes.cartWrapper}>
      <div className={classes.cartContainer}>
        {cartList.length === 0 && (
          <div className={classes.emptyCart}>
            <h3 className={classes.cartHeading}>
              Cart is empty, add something
            </h3>
          </div>
        )}
        <div className={classes.cartSection}>
          {cartList.length > 0 && (
            <section className={classes.itemsSection}>
              <div>
                {cartList.map((item) => {
                  return (
                    <div className={classes.cartItem} key={item.id}>
                      <div>
                        <img alt="product" src={item.image} />
                      </div>
                      <div className={classes.description}>
                        <p>{item.name}</p>
                        <div className={classes.changeQuantity}>
                          <button onClick={() => removeItemHandler(item.id)}>
                            -
                          </button>
                          <p>x {item.quantity}</p>
                          <button onClick={() => addItemHandler(item)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {cartList.length > 0 && (
            <section className={classes.summarySection}>
              <h3>Summary</h3>
              <p>
                Price ({totalItems} {totalItems === 1 ? "item" : "items"}) $
                {totalPrice.toFixed(2)}
              </p>
              {totalPrice < 100 && (
                <i>
                  Delivery charges $20, add ${(100 - totalPrice).toFixed(2)} for
                  free delivery
                </i>
              )}
              {totalPrice > 100 && <i>Your delivery is free😀</i>}
              <h5>
                <b>
                  Total $
                  {totalPrice < 100
                    ? (totalPrice + 20).toFixed(2)
                    : totalPrice.toFixed(2)}
                </b>
              </h5>
              <div className={classes.addressSection}>
                <h3>Select an address</h3>
                <div className={classes.savedAddress}>
                  {userAddress.map((ad, i) => (
                    <p
                      onClick={() => {
                        setSelected((prev) => ({
                          ...prev,
                          id: i,
                          name: ad.name,
                        }));
                      }}
                      key={ad.id}
                      className={`${
                        selected.id === i ? classes.highlight : ""
                      }`}
                    >
                      {ad.name}
                    </p>
                  ))}
                </div>
                {selected.name && (
                  <p className={classes.deliverTo}>
                    Deliver to <b>"{selected.name}"</b>
                  </p>
                )}
                <Link>
                  <Button
                    clickHandler={() => setShowAddress(true)}
                    title="Add an address"
                  />
                </Link>
              </div>
            </section>
          )}
        </div>
        {showAddress && <Address hideAddress={() => setShowAddress(false)} />}
      </div>
      {selected.name && cartList.length > 0 && (
        <Button
          clickHandler={placeOrder}
          className={classes.orderButton}
          title="Place Order"
        />
      )}
      {orderPlaced && <OrderPlaced />}
    </div>
  );
};
