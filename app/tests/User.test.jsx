/* global jest test expect */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import User from "../src/components/pages/User";

jest.mock("axios");

test("renders User component correctly", async () => {
  axios.get.mockResolvedValue({
    data: { id: 1, username: "Sarah" },
  });

  render(
    <BrowserRouter>
      <User />
    </BrowserRouter>
  );

  await waitFor(
    () => {
      expect(screen.queryByTestId("spinner")).toBeNull();
    },
    { timeout: 5000 }
  );

  expect(screen.getByTestId("user")).toBeInTheDocument();
});
