import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {

  const buttonClasses = props.cancel ? `${classes.button} ${classes.cancel}` : classes.button;
  
  return (
    <button
      type={props.type || "button"}
      className={buttonClasses}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button> 
  );
};

export default Button;
