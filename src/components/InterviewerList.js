import React from "react";
import classNames from "classnames";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerListContainer = props.interviewers.map((interviewer) => {
  // console.log("props.interviewer-----", props.interviewer, "interviewer.id-----", interviewer.id)

    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer} //props.interviewer = id
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListContainer}</ul>
    </section>
  );
}