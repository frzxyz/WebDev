import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import FormsUsers from "../components/cms-users/FormsUsers";
import "@testing-library/jest-dom";

// Mock global alert to avoid test environment errors
global.alert = jest.fn();

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "User added successfully" }),
  })
);

describe("FormsUsers Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it("renders the form correctly", () => {
    render(<FormsUsers />);

    // Check if essential elements are rendered
    expect(screen.getByText(/Add Users/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<FormsUsers />);

    // Attempt to submit without filling in required fields
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    // Verify alert for required username
    expect(global.alert).toHaveBeenCalledWith(
      "Please enter a valid country name."
    );
  });

  it("handles valid form submission", async () => {
    render(<FormsUsers />);

    // Fill in the form with valid data
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: "john_doe" },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Role/i), {
        target: { value: "1" }, // Admin role
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    // Verify fetch is called with the correct data
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "john_doe",
        email: "john.doe@example.com",
        roleId: "1",
      }),
    });

    // Verify success alert
    expect(global.alert).toHaveBeenCalledWith("User successfully added");
  });

  it("handles API error response", async () => {
    // Mock fetch API with error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Email already exists" }),
      })
    );

    render(<FormsUsers />);

    // Fill in the form with valid data
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: "john_doe" },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "existing_email@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Role/i), {
        target: { value: "2" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    // Verify fetch is called with correct data
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "john_doe",
        email: "existing_email@example.com",
        roleId: "2",
      }),
    });

    // Verify error message
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Email already exists"
    );
  });

  it("handles unexpected errors", async () => {
    // Mock fetch API with network error
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    render(<FormsUsers />);

    // Fill in the form with valid data
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Username/i), {
        target: { value: "john_doe" },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/Role/i), {
        target: { value: "1" },
      });
      fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    });

    // Verify fetch is called
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "john_doe",
        email: "john.doe@example.com",
        roleId: "1",
      }),
    });

    // Verify error alert
    expect(global.alert).toHaveBeenCalledWith("Failed to add user");
  });
});
