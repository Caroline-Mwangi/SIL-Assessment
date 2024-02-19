import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import UserAlbums from "../src/components/assets/UserAlbums";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("axios");

test("renders user albums correctly", async () => {
  axios.get.mockResolvedValue({
    data: [
      { userId: 1, id: 1, title: "Album 1" },
      { userId: 1, id: 2, thumbnailUrl: "Album 2" },
    ],
  });

  render(
    <BrowserRouter>
      <UserAlbums userId={1} />
    </BrowserRouter>
  );

  await screen.findAllByTestId("album-title");

  const albumElements = screen.getAllByTestId("album-title");
  expect(albumElements.length).toBe(2);

  albumElements.forEach((albumElement) => {
    expect(albumElement).toBeInTheDocument();
  });
});
