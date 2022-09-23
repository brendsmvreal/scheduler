export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const findDay = state.days.filter(
    (dayFiltered) => dayFiltered.name === day
  )[0];
  console.log(findDay);
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
    const interviewerId = interview.interviewer;

    Object.assign(interviewObject, {
      student: interview.student,
      interviewer: {
        id: interviewerId,
        name: state.interviewers[interviewerId].name,
        avatar: state.interviewers[interviewerId].avatar,
      },
    });
  }
  return interviewObject;
}
