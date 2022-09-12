import React from "react";

export default function DayListItem(props) { // component takes 3 tributes, names - spots - selected
  return (
    // <li> is the entire day <h2> display the day name <h3> spots remaining
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots}</h3>
    </li>
  );
}

