import { useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import SingleSkeleton from "./components/SingleSkeleton";
import InputModal from "./UI/InputModal";
import { sendCartData } from "./store/cartItems-slice";
import { sendWishlistData } from "./store/wishlist-slice";
const Root = () => {
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { user, userId } = useSelector((state) => state.login);
  const cart = useSelector((state) => state.cartItems.items);
  const wishListItems = useSelector((state) => state.wishlistItems.items);
  const isLoginOpen = useSelector((state) => state.login.isLoginOpen);
  const header = useSelector((state) => state.header.showHeader);
  useEffect(() => {
    dispatch(sendCartData(cart, userId, user));
  }, [cart]);
  useEffect(() => {
    dispatch(sendWishlistData(wishListItems, user, userId));
  }, [wishListItems]);
  return (
    <div>
      <ScrollToTop />
      {/* <Header/> */}
      {header && <Header />}
      {nav.state === "loading" ? <SingleSkeleton /> : <Outlet />}
      {isLoginOpen && <InputModal />}
    </div>
  );
};

export default Root;
