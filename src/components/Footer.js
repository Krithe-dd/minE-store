import React from "react";
import classes from "./Footer.module.css";
const Footer = () => {
  return (
    <div className={classes.footerWrapper}>
      <div className={classes.footer}>
        <div>Copyright 2023</div>
        <div className={classes.links}>
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/krithe-kishan">LinkedIn</a>
          <a target="_blank" rel="noreferrer" href="https://www.github.com/Krithe-dd">GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
