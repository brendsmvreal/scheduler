import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

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

  const updatedDaysArray = function (newState) {
    // finds day in state
    const findDay = newState.days.find((day) => day.name === newState.day);
    // update the findDay.spots with the spots remaining
    findDay.spots = countSpots(newState);
    // gets the index of the day in newState
    const findDayIndex = newState.days.findIndex(
      (day) => day.name === newState.day
    );
    // creates a copy of the days array
    const daysState = [...newState.days];
    // updates findDay in daysState
    daysState[findDayIndex] = findDay;
    // sets the newState with the updated copy of the days array
    return daysState;
  };

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        // gets the new days array and updates
        // passes a copy of state/appointments
        const updatedDays = updatedDaysArray({
          ...state,
          appointments,
        });
        setState({
          ...state,
          appointments,
          days: [...updatedDays],
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
        // gets the new days array and updates
        // passes a copy of state/appointments
        const updatedDays = updatedDaysArray({
          ...state,
          appointments,
        });
        setState({
          ...state,
          appointments,
          days: [...updatedDays],
        });
      });
  };

  const countSpots = function (newState) {
    let spots = 0;
    // getAppointmentsForDay gets the appointments array
    // loop through appointments array in (day) - found by getAppointmentsForDay
    for (let appointment of getAppointmentsForDay(newState, newState.day)) {
      //check if the interview has a null value
      if (appointment.interview === null) {
        spots += 1;
      }
    }
    return spots;
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

  return { state, setDay, bookInterview, cancelInterview, countSpots };
}
