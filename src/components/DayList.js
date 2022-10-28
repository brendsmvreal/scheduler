import React from "react";

import DayListItem from "./DayListItem.js";

export default function DayList(props) {
  // days array to be passed to our <DayList> component as a prop
  const dayListContainer = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{dayListContainer}</ul>;
}
//  value and onChange in this case is to mimic a standard HTML - <DayList> component is used to receive input from a user. The value and onChange prop names allow a developer to quickly understand this. onChange is bound to the value of an input field. onchange only fires if the value changes.
