import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

const InterviewerList = function (props) {
  const interviewerListContainer = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value} //props.interviewer = id which is same as value
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerListContainer}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  props: PropTypes.array,
};

export default InterviewerList;
