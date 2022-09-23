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
      console.log(state.appointments[key]);
      results.push(state.appointments[key]);
    }
  }
  return results;
}
