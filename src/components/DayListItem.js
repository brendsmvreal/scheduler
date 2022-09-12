import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";
import { render } from "@testing-library/react";

export default function DayListItem(props) {
  // component takes 3 tributes, names - spots - selected
 
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  
  const formatSpots = function (props) {
    if (props.spots === 0) {
      return <h3 className={dayClass}>no spots remaining</h3>;
    }
    if (props.spots === 1) {
      return <h3 className={dayClass}>{props.spots} spot remaining</h3>;
    } else {
      return <h3 className={dayClass}>{props.spots} spots remaining</h3>;
    }
  };
  
  return (
    // <li> is the entire day <h2> display the day name <h3> spots remaining
    <li onClick={() => props.setDay(props.name)}>
      <h2 className={dayClass}>{props.name}</h2>
      <>{formatSpots(props)}</>
    </li>
  );
}
