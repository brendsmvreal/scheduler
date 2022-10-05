import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment";
import Application from "components/Application";
import { waitForElement, getByText } from "@testing-library/react";

afterEach(cleanup);

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    render(<Appointment />);
  });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"));
  });

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
});
