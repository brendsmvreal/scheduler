import React, { useState, useEffect } from "react";
import "./Application.scss";
import Appointment from "./Appointment";
import DayList from "./DayList";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  // Using spread operator to create a new object with all the existing keys of state
  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));
  let dailyAppointments = [];

  // Combining states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`;
    const appointmentsUrl = "http://localhost:8001/api/appointments";
    const interviewersUrl = "http://localhost:8001/api/interviewers";

    // Promise.all will make all requests before updating the state - we can make sure that state won't change
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl),
    ]).then((all) => {
      const newDaysState = all[0].data;
      const newAppointmentsState = all[1].data;
      const newInterviewersState = all[2].data;

      setState((prev) => ({
        ...prev,
        // day: newDaysState[0].name,
        days: newDaysState,
        appointments: newAppointmentsState,
        interviewers: newInterviewersState,
      }));
    });
  }, []);

  if (state.days) {
    dailyAppointments = getAppointmentsForDay(state, state.day);
  }
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({ ...state, appointments });
    console.log(id, interview);
  };
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // props could be represented by ... spread: key={appointment.id}{... appointment}
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
