import { useDispatch, useSelector } from "react-redux";
import classes from "./WishList.module.css";
import { wishlistActions, cartActions } from "../store";
const WishList = () => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state) => state.wishlistItems.items);
  const removeItem = (id) => {
    dispatch(wishlistActions.removeItemFromList({ id }));
  };
  const addToCart = (item) => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        image: item.image || item.poster,
        quantity: 1,
        price: item.price,
        name: item.title || item.name,
      })
    );
  };
  return (
    <div>
      {wishListItems.length === 0 && (
        <h3 className={classes.wishlistHeading}>
          WishList is empty, add something
        </h3>
      )}
      <section className={classes.itemsSection}>
        {wishListItems.map((item) => {
          return (
            <div className={classes.item} key={item.id}>
              <div>
                <img alt="product" src={item.image} />
              </div>
              <div className={classes.description}>
                <span>{item.name}</span>
                <div className={classes.changeQuantity}>
                  <i
                    onClick={() => removeItem(item.id)}
                    className="fa-solid fa-trash-can"
                  ></i>
                  <i
                    onClick={() => addToCart(item)}
                    className="fa-solid fa-cart-shopping"
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default WishList;
