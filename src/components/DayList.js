import React from "react";

import DayListItem from "components/DayListItem.js";

export default function DayList(props) {
  // days array to be passed to our <DayList> component as a prop

  const dayListContainer = props.days.map((day) => {
    return (
      <ul>
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={() => props.onChange(day.name)}
      />
      </ul>
    );
  });
  return <ul>{dayListContainer}</ul>;
}
