import React from "react";
import classNames from "classnames";

import "./DayListItem.scss";


export default function DayListItem(props) {
  // component takes 3 tributes, names - spots - selected
  const dayClass = classNames(
    "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  
  const formatSpots = function(spots) {
    
    if (spots === 0) {
      return 'no spots remaining';
    }
    if (spots === 1) {
      return (spots + ' spot remaining');
    } else {
      return (spots + ' spots remaining');
    }
  };
  
  return (
    // <li> is the entire day <h2> display the day name <h3> spots remaining
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
