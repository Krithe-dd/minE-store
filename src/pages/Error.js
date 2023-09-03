import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import classes from './Error.module.css'
const Error = () => {
  const nav = useNavigate()
  return (
    <div className={classes.errorWrapper}>
      <h3>Oops, something unexpected happened</h3>
      <Button clickHandler={()=>nav('/')} title='Click here'/> to go back to home
    </div>
  );
};

export default Error;
