export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const findDay = state.days.filter(
    (dayFiltered) => dayFiltered.name === day
  )[0];
  if (!findDay) {
    return [];
  }
  const results = [];
  for (const key of findDay.appointments) {
    if (state.appointments[key]) {
      results.push(state.appointments[key]);
    }
  }
  return results;
}

export function getInterview(state, interview) {
  const interviewObject = {};
  if (!interview) {
    return null;
  } else {
    interviewObject.student = interview.student;
    interviewObject.interviewer = state.interviewers[interview.interviewer];
  }
  return interviewObject;
}

export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day
  const findDay = state.days.filter(
    (dayFiltered) => dayFiltered.name === day
  )[0];
  if (!findDay) {
    return [];
  }
  const results = [];
  for (const key of findDay.interviewers) {
    if (state.interviewers[key]) {
      results.push(state.interviewers[key]);
    }
  }
  return results;
}
