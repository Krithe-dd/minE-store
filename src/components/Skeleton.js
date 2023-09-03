import React from "react";
import classes from "./Skeleton.module.css";
const DUMMY = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  ,
  {
    id: 4,
  },
  ,
  {
    id: 5,
  },
  ,
  {
    id: 6,
  },
  ,
  {
    id: 7,
  },
  ,
  {
    id: 8,
  },
  {
    id: 9,
  }
  
];
const Skeleton = () => {
  return (
    <div className={classes.skeletonWrapper}>
      {DUMMY.map((data) => {
        return (
          <div key={data.id} className={classes.skeleton}>
            <div className={classes.imageSkeleton}></div>
            <div className={classes.titleSkeleton}></div>
            <div className={classes.ratingSkeleton}></div>
            <div className={classes.priceSkeleton}></div>
          </div>
        );
      })}
    </div>
  );
};

export default Skeleton;
