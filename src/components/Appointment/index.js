import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const confirm = function () {
    transition(CONFIRM);
  };

  const editForm = function () {
    transition(EDIT);
  };

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

  const deleteInterview = function () {
    transition(DELETE);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        console.log(error);
      });
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
            interviewer={props.interview.interviewer}
            onDelete={confirm}
            onEdit={editForm}
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
        {mode === DELETE && <Status message="Deleting" />}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you want to delete this?"
            onCancel={() => back()}
            onConfirm={deleteInterview}
          />
        )}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => back()}
          />
        )}
      </header>
    </article>
  );
}
