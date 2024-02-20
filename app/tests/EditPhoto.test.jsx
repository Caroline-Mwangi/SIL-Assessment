/* global jest test expect */
/* eslint-disable no-unused-vars */
import React from "react";
/* eslint-enable no-unused-vars */
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import EditPhoto from "../src/components/assets/EditPhoto";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("axios");

test("renders correctly and fetches photo data", async () => {
  const mockPhotoData = { id: 1, title: "Photo Title" };
  axios.get.mockResolvedValue({ data: mockPhotoData });

  render(
    <MemoryRouter initialEntries={["/edit/photo/1"]}>
      <Routes>
        <Route path="/edit/photo/:id" element={<EditPhoto />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/EDIT PHOTO TITLE/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Photo Title...")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Photo Title")).toBeInTheDocument();
  });
});
