import React from "react";
import classNames from "classnames";

import "./Button.scss";

export default function Button(props) { // Button is the parent component 
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button // child HTML component of Button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
