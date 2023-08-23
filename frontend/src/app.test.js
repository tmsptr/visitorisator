import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

import App from "./App";
import "@testing-library/jest-dom";
jest.mock("axios");
describe("App component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the initial state correctly", () => {
    render(<App />);
    const findOutButton = screen.getByText("Find out!");
    expect(findOutButton).toBeInTheDocument();
    expect(screen.queryByText("Don't show")).not.toBeInTheDocument();
  });

  it("displays visitor count when the button is clicked", async () => {
    const mockVisitorCount = 42;
    axios.get.mockResolvedValueOnce({ data: { count: mockVisitorCount } });

    render(<App />);

    const findOutButton = screen.getByText("Find out!");
    fireEvent.click(findOutButton);

    await waitFor(() => {
      expect(screen.getByText(mockVisitorCount)).toBeInTheDocument();
    });
  });
});
