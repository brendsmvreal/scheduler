import { useState, useEffect } from "react";
import axios from "axios";

/*
The state object will maintain the same structure.
The setDay action can be used to set the current day.
The bookInterview action makes an HTTP request and updates the local state.
The cancelInterview action makes an HTTP request and updates the local state.
*/

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = function (day) {
    setState({ ...state, day });
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    //console.log(appointment)
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //console.log(interview)
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
  };

  const cancelInterview = function (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
  };

  useEffect(() => {
    const daysUrl = `http://localhost:8001/api/days`;
    const appointmentsUrl = `http://localhost:8001/api/appointments`;
    const interviewersUrl = `http://localhost:8001/api/interviewers`;

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

  return { state, setDay, bookInterview, cancelInterview };
}
