/* global jest test expect */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Photo from "../src/components/pages/Photo";

jest.mock("axios");

test("renders Photo component correctly", async () => {
  axios.get.mockResolvedValue({
    data: { id: 1, title: "Photo 1", url: "https://myimage.com/image1.jpg" },
  });

  render(
    <BrowserRouter>
      <Photo />
    </BrowserRouter>
  );

  await waitFor(
    () => {
      expect(screen.queryByTestId("spinner")).toBeNull();
    },
    { timeout: 5000 }
  );

  expect(screen.getByTestId("photo")).toBeInTheDocument();
});
