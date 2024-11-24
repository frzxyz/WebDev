import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormsAwards from '../components/cms-awards/FormsAwards';

// Mock fetch untuk API dan global alert
beforeAll(() => {
  global.fetch = jest.fn((url, options) => {
    if (url.includes('/api/cms/movies')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, title: 'Drama 1' },
            { id: 2, title: 'Drama 2' },
          ]),
      });
    }
    if (url.includes('/api/cms/countries')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, name: 'USA' },
            { id: 2, name: 'Japan' },
          ]),
      });
    }
    if (url.includes('/api/cms/awards') && options.method === 'POST') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    }
    return Promise.reject(new Error('Unknown endpoint'));
  });

  global.alert = jest.fn(); // Mock alert untuk mencegah error selama pengujian
});

afterEach(() => {
  jest.clearAllMocks(); // Membersihkan mock setelah setiap tes
});

describe('FormsAwards Component', () => {
  // Render dasar
  it('renders the form with all fields and submit button', async () => {
    render(<FormsAwards />);

    // Tunggu sampai data fetch selesai
    await waitFor(() => expect(screen.getByText('Drama 1')).toBeInTheDocument());

    // Pastikan semua elemen form dirender
    expect(screen.getByPlaceholderText(/Enter award name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter award year/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Drama/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Country/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  // Tes input perubahan data
  it('updates the input fields on change', async () => {
    render(<FormsAwards />);

    await waitFor(() => expect(screen.getByText('Drama 1')).toBeInTheDocument());

    // Ubah nama penghargaan
    fireEvent.change(screen.getByPlaceholderText(/Enter award name/i), {
      target: { value: 'Best Actor' },
    });
    expect(screen.getByPlaceholderText(/Enter award name/i).value).toBe('Best Actor');

    // Ubah tahun
    fireEvent.change(screen.getByPlaceholderText(/Enter award year/i), {
      target: { value: '2023' },
    });
    expect(screen.getByPlaceholderText(/Enter award year/i).value).toBe('2023');
  });

  // Validasi input wajib
  it('validates all fields are required', async () => {
    render(<FormsAwards />);

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitButton);

    // Pastikan alert muncul
    expect(global.alert).toHaveBeenCalledWith('All fields are required and must be valid.');
  });

  // Tes pengiriman data yang valid
  it('submits the form with valid data', async () => {
    render(<FormsAwards />);

    // Tunggu sampai data fetch selesai
    await waitFor(() => expect(screen.getByText('Drama 1')).toBeInTheDocument());

    // Isi semua input
    fireEvent.change(screen.getByPlaceholderText(/Enter award name/i), {
      target: { value: 'Best Actor' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter award year/i), {
      target: { value: '2023' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: /Drama/i }), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByRole('combobox', { name: /Country/i }), {
      target: { value: '1' },
    });

    // Klik tombol submit
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitButton);

    // Pastikan fetch dipanggil dengan data yang benar
    expect(global.fetch).toHaveBeenCalledWith('/api/cms/awards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Best Actor',
        year: 2023,
        dramaId: 1,
        countryId: 1,
      }),
    });

    // Pastikan alert sukses dipanggil
    expect(global.alert).toHaveBeenCalledWith('Award successfully added');
  });

  // Tes render dropdown untuk drama dan negara
  it('renders drama and country dropdowns correctly', async () => {
    render(<FormsAwards />);

    // Tunggu sampai data fetch selesai
    await waitFor(() => expect(screen.getByText('Drama 1')).toBeInTheDocument());

    // Verifikasi drama dan negara dirender
    const dramaDropdown = screen.getByRole('combobox', { name: /Drama/i });
    fireEvent.click(dramaDropdown);
    expect(screen.getByText('Drama 1')).toBeInTheDocument();
    expect(screen.getByText('Drama 2')).toBeInTheDocument();

    const countryDropdown = screen.getByRole('combobox', { name: /Country/i });
    fireEvent.click(countryDropdown);
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });
});
