import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/Filters';
import '@testing-library/jest-dom';
import Modal from 'react-modal'; // Impor Modal dari react-modal

// Tetapkan elemen utama aplikasi untuk Modal
beforeAll(() => {
  Modal.setAppElement(document.createElement('div')); // Mock elemen root aplikasi
});

describe('Filters Component', () => {
  const mockGenres = ['Action', 'Comedy', 'Drama'];
  const mockAvailabilities = ['Netflix', 'Hulu', 'Amazon Prime'];
  const mockAwards = ['Oscar', 'Emmy', 'Golden Globe'];
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all filter elements correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );
    expect(screen.getByRole('button', { name: 'Year' })).toBeInTheDocument();
  });

  it('handles genre selection correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Genre' }));
    fireEvent.click(screen.getByLabelText('Action'));
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ genres: ['Action'] })
    );
  });

  it('handles year selection and clearing correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Interaksi dengan tombol Year
    const yearButton = screen.getByRole('button', { name: 'Year' });
    fireEvent.click(yearButton);

    // Verifikasi modal terbuka
    expect(screen.getByText('Select Year')).toBeInTheDocument();

    // Simulasi pemilihan tahun
    fireEvent.click(screen.getByText('2022')); // Mock DatePicker
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ year: 2022 })
    );
  });

  it('handles sort option selection correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Gunakan query berbasis role untuk elemen dropdown
    const sortDropdown = screen.getByRole('combobox');
    fireEvent.change(sortDropdown, { target: { value: 'year' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ sortOption: 'year' })
    );
  });
});
