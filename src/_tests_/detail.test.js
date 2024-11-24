import { render, screen } from '@testing-library/react';
import DramaDetails from '../pages/dramas/[id]';
import '@testing-library/jest-dom';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: {},
    push: jest.fn(),
  })),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock data for drama
const mockDrama = {
  id: 1,
  title: 'Mock Drama',
  alternativeTitle: 'Alternative Title',
  year: 2023,
  genres: [{ name: 'Action' }, { name: 'Adventure' }],
  duration: 120,
  rating: 4.5,
  availability: 'Netflix',
  synopsis: 'This is a mock synopsis for the drama.',
  urlPhoto: '/mock-photo.jpg',
  actors: [
    { name: 'Actor 1', role: 'Lead', photo: '/actor1.jpg' },
    { name: 'Actor 2', role: 'Supporting', photo: '/actor2.jpg' },
  ],
  trailerLink: 'https://youtu.be/example',
  reviews: [],
};

describe('DramaDetails Component', () => {
  beforeEach(() => {
    useSession.mockReturnValue({
      data: { user: { id: 1, name: 'Test User' } },
      status: 'authenticated',
    });
  });

  it('renders drama details correctly', () => {
    render(<DramaDetails drama={mockDrama} initialReviews={[]} />);

    // Check if drama details are rendered correctly
    expect(screen.getByText('Mock Drama')).toBeInTheDocument();
    expect(screen.getByText('Alternative Title')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Action, Adventure')).toBeInTheDocument();
    expect(screen.getByText('120 Minutes')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('This is a mock synopsis for the drama.')).toBeInTheDocument();

    // Check if actors are rendered
    expect(screen.getByText('Actor 1')).toBeInTheDocument();
    expect(screen.getByText('Actor 2')).toBeInTheDocument();

    // Check if image and trailer are rendered
    const image = screen.getByAltText('Mock Drama');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/mock-photo.jpg');

    const iframe = screen.getByTitle('Drama Trailer');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/example?autoplay=1&mute=0&controls=1'
    );
  });

  it('displays a message when drama data is not found', () => {
    render(<DramaDetails drama={null} initialReviews={[]} />);

    // Check for "Drama not found" message
    expect(screen.getByText('Drama not found')).toBeInTheDocument();
  });
});
