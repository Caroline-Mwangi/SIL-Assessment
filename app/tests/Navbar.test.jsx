/* global test expect */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import { render, screen } from "@testing-library/react";
import Navbar from "../src/components/assets/Navbar";
import "@testing-library/jest-dom";

test("renders Navbar component with correct text", () => {
  render(<Navbar />);
  const navbarElement = screen.getByText(/SIL ASSESSMENT/i);
  expect(navbarElement).toBeInTheDocument();
});
