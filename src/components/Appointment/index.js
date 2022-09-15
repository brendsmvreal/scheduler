import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import "./styles.scss";

export default function Appointment(props) {
  // props.interview ?
  console.log("props.student------", props.student);
  return (
    <article className="appointment">
      <header>
        <Header time={props.time} />
        {props.interview ? (
          <Show
            student={"Lydia Miller-Jones"}
            interviewer={props.interview.interviewer.name}
          />
        ) : (
          <Empty />
        )}
      </header>
    </article>
  );
}
