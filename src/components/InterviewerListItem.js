import React, { useState } from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = classNames("interviewers__item-image", {
    "interviewers__item--selected": props.selected,
  });
  // console.log('props.setInterviewer:', props.setInterviewer)
  return (
    <li
      className={interviewerClass}
      // onClick={() => props.setInterviewer(props.id)}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name} 
    </li>
  );
}
