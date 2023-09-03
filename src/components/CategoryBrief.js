import React from "react";
import classes from "./CategoryBrief.module.css";
import { Link } from "react-router-dom";
import Home from "../assets/HomeInt.jpg";
import { useDispatch } from "react-redux";
import { headerActions } from "../store";
const CategoryBrief = () => {
  const dispatch = useDispatch();
  return (
    <div className={classes.categoryWrapper}>
      <h1>Browse by category</h1>
      <section className={classes.category}>
        <div>
          <p>Styles</p>
          <Link
            to="/styles"
            onClick={() =>
              dispatch(headerActions.toggleHeader({ display: "show" }))
            }
          >
            <img alt="clothing" src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
          </Link>
        </div>
        <div>
          <p>Electronics</p>
          <Link
            to="/electronics"
            onClick={() =>
              dispatch(headerActions.toggleHeader({ display: "show" }))
            }
          >
            <img alt="home" src={Home}></img>
          </Link>
        </div>
        <div>
          <p>E-Books</p>
          <Link
            to="/books"
            onClick={() =>
              dispatch(headerActions.toggleHeader({ display: "show" }))
            }
          >
            <img alt="books" src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=40"></img>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CategoryBrief;
