import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import FormsMovies from '../components/cms-movies/FormsMovies';

// Mock fetch API
global.fetch = jest.fn();

// Mock data
const mockGenres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' }
];

const mockCountries = [
  { id: 1, name: 'United States' },
  { id: 2, name: 'United Kingdom' }
];

const mockActors = [
  { id: 1, name: 'Tom Hanks', photo: 'tom-hanks.jpg' },
  { id: 2, name: 'Emma Stone', photo: 'emma-stone.jpg' }
];

describe('FormsMovies Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockReset();
    
    // Mock API responses
    fetch.mockImplementation((url) => {
      if (url === '/api/cms/genre') {
        return Promise.resolve({
          json: () => Promise.resolve(mockGenres)
        });
      }
      if (url === '/api/cms/countries') {
        return Promise.resolve({
          json: () => Promise.resolve(mockCountries)
        });
      }
      if (url === '/api/cms/actors') {
        return Promise.resolve({
          json: () => Promise.resolve(mockActors)
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  test('renders Add Movie button', () => {
    render(<FormsMovies />);
    expect(screen.getByText('Add Movie')).toBeInTheDocument();
  });

  test('opens modal when Add Movie button is clicked', () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));
    expect(screen.getByText('Add New Movie')).toBeInTheDocument();
  });

  test('loads and displays genres', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));
    
    await waitFor(() => {
      mockGenres.forEach(genre => {
        expect(screen.getByLabelText(genre.name)).toBeInTheDocument();
      });
    });
  });

  test('loads and displays countries in select dropdown', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));
    
    await waitFor(() => {
      const countrySelect = screen.getByLabelText('Country');
      mockCountries.forEach(country => {
        expect(countrySelect).toContainHTML(country.name);
      });
    });
  });

  test('validates required fields on submit', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please select at least one genre.')).toBeInTheDocument();
      expect(screen.getByText('Please select at least one actor.')).toBeInTheDocument();
    });
  });

  test('handles genre selection correctly', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));
    
    await waitFor(() => {
      const genreCheckbox = screen.getByLabelText('Action');
      fireEvent.click(genreCheckbox);
      expect(genreCheckbox).toBeChecked();
    });
  });

  test('handles actor selection correctly', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));
    
  });

  test('handles form submission with valid data', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));
    
    // Fill in required fields
    await waitFor(() => {
      // Fill title
      const titleInput = screen.getByLabelText('Title');
      fireEvent.change(titleInput, { target: { value: 'Test Movie' } });

      // Select country
      const countrySelect = screen.getByLabelText('Country');
      fireEvent.change(countrySelect, { target: { value: '1' } });

      // Fill year
      const yearInput = screen.getByLabelText('Year');
      fireEvent.change(yearInput, { target: { value: '2023' } });

      // Select genre
      const genreCheckbox = screen.getByLabelText('Action');
      fireEvent.click(genreCheckbox);

      // Add actor
      const actorInput = screen.getByPlaceholderText('Search Actor Names');
      fireEvent.change(actorInput, { target: { value: mockActors[0].name } });
    });

    // Mock successful submission
    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Movie successfully added!' })
      })
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/cms/movies', expect.any(Object));
    });
  });

  test('handles availability selection correctly', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));
    
    await waitFor(() => {
      const availabilityButton = screen.getByText('Select Availability');
      fireEvent.click(availabilityButton);
      
      const netflixOption = screen.getByLabelText('Netflix');
      fireEvent.click(netflixOption);
      
      expect(netflixOption).toBeChecked();
    });
  });

  test('displays error message from backend', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));

    // Mock failed submission
    fetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Invalid movie data' })
      })
    );

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Invalid movie data')).toBeInTheDocument();
    });
  });

  test('validates title format', async () => {
    render(<FormsMovies />);
    fireEvent.click(screen.getByText('Add Movie'));

    await waitFor(() => {
      const titleInput = screen.getByLabelText('Title');
      fireEvent.change(titleInput, { target: { value: 'Test123' } });
      
      fireEvent.click(screen.getByText('Submit'));
      
      expect(screen.getByText('Title must only contain letters, spaces, hyphens, and apostrophes.')).toBeInTheDocument();
    });
  });
});