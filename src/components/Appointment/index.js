import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => console.log(error));
  };
  // console.log("props.interviewer----", props.interviewers);

  return (
    <article className="appointment">
      <header>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => back()}
          />
        )}
        {mode === SAVING && <Status message="Saving" />}
      </header>
    </article>
  );
}
