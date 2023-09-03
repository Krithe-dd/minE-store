import React from "react";
import classes from "./Trending.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store";
import { wishlistActions } from "../store";

const Trending = ({product}) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishlistItems.items);
  const wishlistItem = wishList.find((item) => item.id === product.id);
  const wishListClass = `${wishlistItem ? "fa-solid" : "fa-regular"} fa-heart`;

  const addToCart = (product) => {
    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        image: product.image || product.poster,
        quantity: 1,
        price: product.price,
        name: product.title || product.name,
        rating: product.rating.rate || product.rating,
      })
    );
  };
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
  return (
          <div className={classes.itemContainer}>
            <Link to={`/trending/${product.id}`} key={product.id}>
              <img alt="product" src={product.image} />
            </Link>
            <section>
              <i
                onClick={() => addToWishlist(product.id)}
                className={wishListClass}
              ></i>
              <i
                onClick={() => addToCart(product)}
                className="fa-solid fa-cart-shopping"
              ></i>
            </section>
          </div>
  );
};

export default Trending;
