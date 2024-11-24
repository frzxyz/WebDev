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
  const mockAvailabilities = ['Netflix', 'Hulu', 'Prime Video'];
  const mockAwards = ['Oscar', 'Emmy', 'Golden Globe'];
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  // 1. Tes render awal semua elemen filter
  it('renders all filter elements correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Verifikasi elemen dasar
    expect(screen.getByRole('button', { name: 'Year' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Genre' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Award' })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // Sort dropdown
  });

  // 2. Tes logika pemilihan genre
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

  // 3. Tes pemilihan dan penghapusan tahun
  it('handles year selection and clearing correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Pilih tahun
    const yearButton = screen.getByRole('button', { name: 'Year' });
    fireEvent.click(yearButton);
    expect(screen.getByText('Select Year')).toBeInTheDocument(); // Verifikasi modal terbuka

    // Simulasikan pemilihan tahun
    fireEvent.click(screen.getByText('2022'));
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ year: 2022 })
    );
  });

  // 4. Tes logika dropdown sorting
  it('handles sort option selection correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Pilih opsi sort
    const sortDropdown = screen.getByRole('combobox');
    fireEvent.change(sortDropdown, { target: { value: 'year' } });
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ sortOption: 'year' })
    );
  });

  // 5. Tes pemilihan penghargaan (awards)
  it('handles award selection correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Klik dropdown Award
    fireEvent.click(screen.getByRole('button', { name: 'Award' }));

    // Pilih salah satu award (Oscar)
    fireEvent.click(screen.getByLabelText('Oscar'));
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ awards: ['Oscar'] })
    );
  });

  // 6. Tes render dropdown awards dengan benar
  it('renders awards dropdown correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Klik dropdown Award
    fireEvent.click(screen.getByRole('button', { name: 'Award' }));

    // Pastikan semua awards dirender
    mockAwards.forEach((award) => {
      expect(screen.getByLabelText(award)).toBeInTheDocument();
    });
  });

  // 7. Tes kombinasi filter
  it('handles multiple filter selections correctly', () => {
    render(
      <Filters
        genres={mockGenres}
        availabilities={mockAvailabilities}
        awards={mockAwards}
        onFilterChange={mockOnFilterChange}
      />
    );

    // Pilih genre "Action"
    fireEvent.click(screen.getByRole('button', { name: 'Genre' }));
    fireEvent.click(screen.getByLabelText('Action'));

    // Pilih tahun "2022"
    fireEvent.click(screen.getByRole('button', { name: 'Year' }));
    fireEvent.click(screen.getByText('2022'));

    // Pilih award "Oscar"
    fireEvent.click(screen.getByRole('button', { name: 'Award' }));
    fireEvent.click(screen.getByLabelText('Oscar'));

    // Verifikasi callback dipanggil dengan semua filter
    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        genres: ['Action'],
        year: 2022,
        awards: ['Oscar'],
      })
    );
  });

});
