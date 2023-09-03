import React, { useEffect } from "react";
import classes from "./ProductCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { sendWishlistData } from "../store/wishlist-slice";
import { Link, useLocation } from "react-router-dom";
import { wishlistActions } from "../store";
const ProductCard = ({ product }) => {
  const {user,userId} = useSelector(state=>state.login);
  const wishlistItems = useSelector((state) => state.wishlistItems.items);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const actualPrice = product.price * 1.5;
  const wishlistItem = wishlistItems.find((item) => item.id === product.id);
  const wishListClass = `${wishlistItem ? "fa-solid" : "fa-regular"} fa-heart`;

  const addToWishlist = (id) => {
    if (wishlistItem) {
      dispatch(wishlistActions.removeItemFromList({ id }));
    } else {
      dispatch(
        wishlistActions.addItemToList({
          id: product.id,
          image: product.image || product.poster,
          price: product.price,
          name: product.title || product.name,
        })
      );
    }
  };
  useEffect(()=>{
    dispatch(sendWishlistData(wishlistItems,user,userId))
  },[wishlistItems])
  let customRating;
  if (
    (Math.round(product.rating.rate) >= 4) ||
    (product.rating >= 4)
  ) {
    customRating = classes.green;
  } else if (
    (Math.round(product.rating.rate) === 3) ||
    (product.rating === 3)
  ) {
    customRating = classes.orange;
  } else {
    customRating = classes.red;
  }
  const ratingClass = `${classes.rating} ${customRating}`
  return (
    <div className={classes.productCard}>
      <i
        onClick={() => addToWishlist(product.id)}
        className={wishListClass}
      ></i>
      <Link to={`${pathname}/${product.id}`}>
        <img src={product.image || product.poster} />
        <div className={classes.actions}>
          <h5>{product.title || product.name}</h5>
          <p className={ratingClass}>
            ⭐{Math.round(product.rating.rate) || product.rating}
          </p>
          <p>
            ${product.price}&nbsp;<span>${actualPrice.toFixed()}</span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
