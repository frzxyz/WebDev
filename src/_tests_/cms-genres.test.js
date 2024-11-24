import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormsGenres from "../components/cms-genres/FormsGenres";
import "@testing-library/jest-dom";

// Mock global alert untuk menghindari error dalam testing
global.alert = jest.fn();

describe("FormsGenres Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Bersihkan mock sebelum setiap tes
  });

  it("renders the form correctly", () => {
    render(<FormsGenres />);

    // Verifikasi elemen form ada
    expect(screen.getByLabelText(/Genre Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("validates input for genre name", async () => {
    render(<FormsGenres />);

    // Simulasikan submit tanpa mengisi nama genre
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Verifikasi alert muncul untuk input kosong
    expect(global.alert).toHaveBeenCalledWith("Please enter a valid genre name.");

    // Simulasikan input nama genre yang tidak valid
    fireEvent.change(screen.getByLabelText(/Genre Name/i), {
      target: { value: "123@Invalid" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Verifikasi alert muncul untuk nama yang tidak valid
    expect(global.alert).toHaveBeenCalledWith(
      "Genre name must only contain letters, spaces, hyphens, and apostrophes."
    );
  });

  it("handles valid form submission", async () => {
    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: "Action" }),
      })
    );

    render(<FormsGenres />);

    // Isi form dengan data valid
    fireEvent.change(screen.getByLabelText(/Genre Name/i), {
      target: { value: "Action" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Exciting and adventurous movies." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Pastikan fetch dipanggil dengan benar
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/genre", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Action",
        description: "Exciting and adventurous movies.",
      }),
    });

    // Pastikan alert muncul untuk sukses
    expect(global.alert).toHaveBeenCalledWith("Genre \"Action\" added successfully!");
  });

  it("handles API error response", async () => {
    // Mock fetch API dengan error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Failed to add genre" }),
      })
    );

    render(<FormsGenres />);

    // Isi form dengan data valid
    fireEvent.change(screen.getByLabelText(/Genre Name/i), {
      target: { value: "Action" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Exciting and adventurous movies." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Pastikan fetch dipanggil dengan benar
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/genre", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Action",
        description: "Exciting and adventurous movies.",
      }),
    });

    // Verifikasi pesan error ditampilkan
    expect(await screen.findByRole("alert")).toHaveTextContent("Failed to add genre");
  });

  it("handles unexpected errors", async () => {
    // Mock fetch API dengan error
    global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

    render(<FormsGenres />);

    // Isi form dengan data valid
    fireEvent.change(screen.getByLabelText(/Genre Name/i), {
      target: { value: "Action" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Exciting and adventurous movies." },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Pastikan fetch dipanggil
    expect(global.fetch).toHaveBeenCalledWith("/api/cms/genre", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Action",
        description: "Exciting and adventurous movies.",
      }),
    });

    // Verifikasi pesan error ditampilkan
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "An unexpected error occurred. Please try again."
    );
  });
});
