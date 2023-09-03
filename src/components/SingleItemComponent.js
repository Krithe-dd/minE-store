import React, { useState } from "react";
import classes from "./SingleItemComponent.module.css";
import { useDispatch } from "react-redux";
import { cartActions, wishlistActions } from "../store";
import Button from "./Button";

const SingleItemComponent = ({ product }) => {
  const dispatch = useDispatch();
  const rating =
    typeof product.rating === "object" ? product.rating.rate : product.rating;

  const smiley =
    Math.round(rating) < 3 ? "😞" : Math.round(rating) > 3 ? "😀" : "😐";
    
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCart = () => {
    dispatch(cartActions.addItemToCart({
          id: product.id,
          image: product.image || product.poster,
          quantity: quantity,
          price: product.price,
          name: product.title || product.name,
          rating: product.rating.rate || product.rating,
        })
        );
      };
  const addToWishList = ()=>{
    dispatch(wishlistActions.addItemToList({
        id: product.id,
        image: product.image || product.poster,
        price: product.price,
        name: product.title || product.name,
    }))
  }
  return (
    <div className={classes.SingleItemComponent}>
      <img alt="product" src={product.poster || product.image} />
      <div className={classes.actions}>
        <h3>{product.name || product.title}</h3>
        <h4>${product.price}</h4>
        <i>
          {Math.round(product.rating.rate) || product.rating} out of 5 people
          liked this product {smiley}
        </i>
        <div>
          <div className={classes.count}>
            <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
        </div>
        <div>
        <Button clickHandler={addToWishList} title='Wishlist'/>
        <Button clickHandler={addToCart} title='Add to Cart'/>
        </div>
      </div>
    </div>
  );
};

export default SingleItemComponent;
