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
        setDay={props.onChange}
      />
    );
  });
  return <ul>{dayListContainer}</ul>;
}
