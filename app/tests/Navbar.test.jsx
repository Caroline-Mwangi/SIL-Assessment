import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../src/components/assets/Navbar";
import "@testing-library/jest-dom";

test("renders Navbar component with correct text", () => {
  render(<Navbar />);
  const navbarElement = screen.getByText(/SIL ASSESSMENT/i);
  expect(navbarElement).toBeInTheDocument();
});
