import React from "react";
import classes from "./SingleSkeleton.module.css";

const SingleSkeleton = () => {
  return (
    <div className={classes.skeletonWrapper}>
      <div className={classes.skeleton}>
        <div className={classes.imageSkeleton}></div>
        <div className={classes.desc}>
        <div className={classes.titleSkeleton}></div>
        <div className={classes.ratingSkeleton}></div>
        <div className={classes.priceSkeleton}></div>
        <div className={classes.buttonSkeleton}></div>
        <div className={classes.buttonSkeleton}></div>
        </div>
      </div>
    </div>
  );
};

export default SingleSkeleton;
