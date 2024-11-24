import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormsActors from "../components/cms-actors/FormsActors";

beforeAll(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes("/api/cms/countries")) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: "1"},
            { id: "2"},
          ]),
      });
    }
    return Promise.reject(new Error("Unknown endpoint"));
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("FormsActors Input Tests", () => {
  it("updates the name input field on change", () => {
    render(<FormsActors />);
    const nameInput = screen.getByPlaceholderText(/Enter actor name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });

  it("updates the photo input field on change", () => {
    render(<FormsActors />);
    const photoInput = screen.getByPlaceholderText(/Enter URL Photo/i);
    fireEvent.change(photoInput, { target: { value: "https://example.com/photo.jpg" } });
    expect(photoInput.value).toBe("https://example.com/photo.jpg");
  });

  it("updates the country select field on change", async () => {
    render(<FormsActors />);

    // Test Input Negara Belum
    // await waitFor(() => screen.getByText("Japan"));

    // // Pilih elemen dropdown
    // const countrySelect = screen.getByRole("combobox", { name: /Country/i });
    // fireEvent.change(countrySelect, { target: { value: "1" } });
    // expect(countrySelect.value).toBe("1");
  });
});
