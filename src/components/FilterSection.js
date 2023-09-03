import React from "react";
import classes from "./FilterSection.module.css";
import RatingFilter from "./RatingFilter";
import { useDispatch } from "react-redux";
import { productActions } from "../store";
import { useSelector } from "react-redux";
import Button from "./Button";
const FilterSection = () => {
  const { price } = useSelector((state) => state.products);
  const handleStartChange = (event) => {
    const newValue = parseInt(event.target.value);
    dispatch(productActions.setPriceFilter(newValue));
  };
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(productActions.applyFilter());
  };
  const clearFilter = () => {
    dispatch(productActions.clearFilter());
  };
  return (
    <div className={classes.filterWrapper}>
    <form onSubmit={submitHandler} className={classes.filterForm}>
      <h3>FILTERS</h3>
      <div className={classes.sortByPrice}>
        <h5>Sort by price</h5>
        <div className={classes.rangeSlider}>
          <input
            type="range"
            min="0"
            max="200"
            value={price}
            onChange={handleStartChange}
            className={classes.startRange}
          />
        </div>
        <span>${price}</span>
      </div>
      <div className={classes.sortByRating}>
        <h5>Sort by rating</h5>
        <RatingFilter label="4" />
        <RatingFilter label="3" />
        <RatingFilter label="2" />
        <RatingFilter label="1" />
      </div>
      <div>
        <Button type="submit" title="APPLY FILTER" />
        <Button type="button" clickHandler={clearFilter} title="CLEAR FILTER" />
      </div>
    </form>
    </div>
  );
};

export default FilterSection;
