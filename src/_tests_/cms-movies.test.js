import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import FormsMovies from "../components/cms-movies/FormsMovies";
import "@testing-library/jest-dom";

// Mock global alert to avoid test environment errors
global.alert = jest.fn();

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        { id: 1, name: "Actor 1" },
        { id: 2, name: "Actor 2" },
      ]),
  })
);

describe("FormsMovies Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("renders the form correctly", () => {
    render(<FormsMovies />);

    // Check if essential elements are rendered
    expect(screen.getByText(/Add Movie/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Actors/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<FormsMovies />);

    // Attempt to submit without filling in required fields
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    // Verify that required field errors are displayed
    expect(
      await screen.findByText(/Please select at least one genre/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Please select at least one actor/i)
    ).toBeInTheDocument();
  });

  it("handles valid form submission", async () => {
    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ title: "Inception" }),
      })
    );

    render(<FormsMovies />);

    // Fill in the form with valid data
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Title/i), {
        target: { value: "Inception" },
      });
      fireEvent.change(screen.getByLabelText(/Year/i), {
        target: { value: "2010" },
      });
      fireEvent.click(screen.getByLabelText(/Action/i)); // Simulate selecting a genre
      fireEvent.change(screen.getByLabelText(/Actors/i), {
        target: { value: "Leonardo DiCaprio" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    // Verify fetch is called with the correct data
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Inception",
        year: 2010,
        genre: ["Action"],
        actors: ["Leonardo DiCaprio"],
      }),
    });

    // Verify success alert
    expect(global.alert).toHaveBeenCalledWith("Movie successfully added");
  });

  it("handles API error response", async () => {
    // Mock fetch API with error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Failed to add movie" }),
      })
    );

    render(<FormsMovies />);

    // Fill in the form with valid data
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Title/i), {
        target: { value: "Inception" },
      });
      fireEvent.change(screen.getByLabelText(/Year/i), {
        target: { value: "2010" },
      });
      fireEvent.click(screen.getByLabelText(/Action/i));
      fireEvent.change(screen.getByLabelText(/Actors/i), {
        target: { value: "Leonardo DiCaprio" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    // Verify fetch is called with correct data
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Inception",
        year: 2010,
        genre: ["Action"],
        actors: ["Leonardo DiCaprio"],
      }),
    });

    // Verify error alert
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Failed to add movie"
    );
  });

  it("handles unexpected errors", async () => {
    // Mock fetch API with network error
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    render(<FormsMovies />);

    // Fill in the form with valid data
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Title/i), {
        target: { value: "Inception" },
      });
      fireEvent.change(screen.getByLabelText(/Year/i), {
        target: { value: "2010" },
      });
      fireEvent.click(screen.getByLabelText(/Action/i));
      fireEvent.change(screen.getByLabelText(/Actors/i), {
        target: { value: "Leonardo DiCaprio" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    // Verify fetch is called
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Inception",
        year: 2010,
        genre: ["Action"],
        actors: ["Leonardo DiCaprio"],
      }),
    });

    // Verify error alert
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "An unexpected error occurred. Please try again."
    );
  });
});