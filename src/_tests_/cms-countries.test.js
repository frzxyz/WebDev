import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AddCountry from "../components/cms-countries/AddCountry";
import "@testing-library/jest-dom";

// Mock global fetch and alert
global.fetch = jest.fn();
global.alert = jest.fn();

describe("AddCountry Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it("renders the form correctly", () => {
    render(<AddCountry />);

    // Check if essential elements are rendered
    expect(screen.getByPlaceholderText(/Enter Country Name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
  });

  it("displays an error if the input is empty", async () => {
    render(<AddCountry />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    });

    // Verify alert is triggered
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid country name.");
  });

  it("displays an error if the input contains invalid characters", async () => {
    render(<AddCountry />);

    const input = screen.getByPlaceholderText(/Enter Country Name/i);

    await act(async () => {
      fireEvent.change(input, { target: { value: "123@!#" } }); // Invalid input
      fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    });

    // Verify alert is triggered
    expect(global.alert).toHaveBeenCalledWith(
      "Country name must only contain letters, spaces, hyphens, and apostrophes."
    );
  });

  it("handles successful form submission", async () => {
    // Mock fetch success response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: "Test Country" }),
    });

    render(<AddCountry />);

    const input = screen.getByPlaceholderText(/Enter Country Name/i);

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test Country" } });
      fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    });

    // Verify fetch is called with correct arguments
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/countries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test Country" }),
    });

    // Verify alert is triggered
    expect(global.alert).toHaveBeenCalledWith('Country "Test Country" added successfully!');
  });

  it("handles API error response", async () => {
    // Mock fetch error response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Country already exists" }),
    });

    render(<AddCountry />);

    const input = screen.getByPlaceholderText(/Enter Country Name/i);

    await act(async () => {
      fireEvent.change(input, { target: { value: "Duplicate Country" } });
      fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    });

    // Verify fetch is called
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/countries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Duplicate Country" }),
    });

    // Verify error message is displayed
    expect(await screen.findByRole("alert")).toHaveTextContent("Country already exists");
  });

  it("handles unexpected errors", async () => {
    // Mock fetch network error
    global.fetch.mockRejectedValueOnce(new Error("Network Error"));

    render(<AddCountry />);

    const input = screen.getByPlaceholderText(/Enter Country Name/i);

    await act(async () => {
      fireEvent.change(input, { target: { value: "Test Country" } });
      fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    });

    // Verify error message is displayed
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "An unexpected error occurred. Please try again."
    );
  });
});
