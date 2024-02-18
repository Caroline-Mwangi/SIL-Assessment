import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../src/components/assets/Loader";
import "@testing-library/jest-dom";

test("renders Loader component with correctly", () => {
  render(<Loader />);
  const loaderElements = screen.getAllByRole("status");
  expect(loaderElements.length).toBe(3);
  loaderElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
});
