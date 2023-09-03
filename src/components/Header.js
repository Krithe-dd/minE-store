import React, { useEffect, useRef, useState } from "react";
import classes from "./Header.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cartActions,
  loginActions,
  wishlistActions,
  portalActions,
} from "../store";
const Header = () => {
  const [cartHighlighted, setCartHighlighted] = useState(false);
  const [wishHighlighted, setWishHighlighted] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const cartList = useSelector((state) => state.cartItems.items);
  const wishlist = useSelector((state) => state.wishlistItems.items);
  const cartTotal = useSelector((state) => state.cartItems.total);
  const user = useSelector((state) => state.login.user);
  const { pathname } = useLocation();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setDropdown(false);
      }else if( dropdownRef.current.contains(event.target) || event.target.classList('fa-user')){
        setDropdown(prev=>!prev);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const setLogin = () => {
    document.body.classList.add("no-scroll");
    dispatch(loginActions.setLoginState({ type: "TRUE" }));
    dispatch(portalActions.setPortal({ type: "login" }));
  };

  const handleSignout = () => {
    dispatch(loginActions.signOut());
    dispatch(cartActions.replaceCart());
    dispatch(wishlistActions.replaceWishlist());
    nav('/')
  };
  useEffect(() => {
    setCartHighlighted(true);
    const timer = setTimeout(() => {
      setCartHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartList]);
  useEffect(() => {
    setWishHighlighted(true);
    const timer = setTimeout(() => {
      setWishHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [wishlist]);
  const handleList = (link) => {
    setDropdown(false);
    nav(`${link}`);
  };
  const wishlistClass = `${classes.link} ${
    wishHighlighted ? classes.bump : ""
  }`;
  const cartClass = `${classes.link} ${cartHighlighted ? classes.bump : ""}`;
  const homeClass = `${classes.iconHome} fa-solid fa-home`
  return (
    <div className={classes.container}>
      <nav className={pathname === "/" ? classes.header : classes.notInhome}>
      <div className={classes.welcome}>
      <Link className={classes.homeIcon} to='/'>
      <i className={homeClass}></i>
      </Link>
        <h5>
          Welcome <b>{user?.username}</b>
        </h5>
        </div>
        <div className={classes.logo}>MIN-E STORE</div>
        <div className={classes.account}>
          <Link className={wishlistClass} to="/wishlist">
            ❤️
          </Link>
          <Link className={cartClass} to="/cart">
            Cart {cartTotal}
          </Link>
          {!user && (
            <div className={classes.link} onClick={setLogin}>
              Login
            </div>
          )}
          {!user && (
            <Link className={classes.link} to="/reg">
              Register
            </Link>
          )}
          {user && (
            <div
              ref={dropdownRef}
              className={`${classes.dropdownContainer} ${classes.link} `}
            >
              <div>
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          )}

          {user && dropdown && (
            <ul className={classes.dropdownMenu}>
              <li onClick={() => handleList("address")}>Addresses</li>
              <li onClick={()=>handleList('orders')}>Orders</li>
              <li onClick={handleSignout}>Sign Out</li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
