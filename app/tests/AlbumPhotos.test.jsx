/* global jest test expect */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import { render, screen } from "@testing-library/react";
import axios from "axios";
import AlbumPhotos from "../src/components/assets/AlbumPhotos";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("axios");

test("renders AlbumPhotos component correctly", async () => {
  axios.get.mockResolvedValue({
    data: [
      { id: 1, thumbnailUrl: "https://myimage.com/image1.jpg" },
      { id: 2, thumbnailUrl: "https://myimage.com/image2.jpg" },
    ],
  });

  render(
    <BrowserRouter>
      <AlbumPhotos albumId={1} />
    </BrowserRouter>
  );

  await screen.findAllByTestId("img");

  const photoElements = screen.getAllByTestId("img");
  expect(photoElements.length).toBe(2);

  photoElements.forEach((photoElement) => {
    expect(photoElement).toBeInTheDocument();
  });
});
