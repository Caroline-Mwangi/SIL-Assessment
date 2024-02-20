/* global jest test expect */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../src/components/pages/Home";

jest.mock("axios");

test("renders Home component correctly", async () => {
  axios.get.mockResolvedValue({
    data: [
      { id: 1, name: "John", username: "Doe" },
      { id: 2, name: "Jane", username: "Doe" },
    ],
  });

  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  await waitFor(
    () => {
      expect(screen.queryByTestId("spinner")).toBeNull();
    },
    { timeout: 5000 }
  );

  const userElements = screen.getAllByTestId("username");
  expect(userElements.length).toBe(2);

  userElements.forEach((userElement) => {
    expect(userElement).toBeInTheDocument();
  });
});
