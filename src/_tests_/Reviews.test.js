import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddReviewForm from '../components/AddReviewForm';
import { useSession } from 'next-auth/react';
import '@testing-library/jest-dom';
import 'whatwg-fetch';

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn(),
}));


describe('AddReviewForm Component', () => {
  const mockDramaId = 1;
  const mockOnAddReview = jest.fn();

  it('renders the form when the user is logged in', () => {
    useSession.mockReturnValue({
      data: { user: { name: 'Test User', email: 'test@example.com' ,id:1} },
      status: 'authenticated',
    });

    render(<AddReviewForm dramaId={mockDramaId} onAddReview={mockOnAddReview} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Thoughts/i)).toBeInTheDocument();
  });

  it('displays an alert or message if user is not logged in', () => {
    useSession.mockReturnValueOnce({ data: null, status: 'unauthenticated' });
  
    render(
      <div>
        {useSession().data ? (
          <AddReviewForm dramaId={1} onAddReview={jest.fn()} />
        ) : (
          <p>
            Please <a href="/login">login</a> to add a review.
          </p>
        )}
      </div>
    );
  
    // Cek elemen <p> tanpa memeriksa elemen <a>
    expect(
      screen.getByText((content, element) => {
        return content.includes('Please ') && element.tagName.toLowerCase() === 'p';
      })
    ).toBeInTheDocument();
  });
  
  

  it('handles review submission correctly for logged-in users', async () => {
    // Mock session


    const newReview = {
      dramaId: mockDramaId,
      userId: 1, // User ID yang cocok dengan mock session
      userName: 'Test User',
      rating: 4,
      comment: 'Amazing movie!',
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(newReview),
    });
    

    // Render komponen
    render(<AddReviewForm dramaId={mockDramaId} onAddReview={mockOnAddReview} />);

    // Isi form
    fireEvent.change(screen.getByLabelText(/rating/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/thoughts/i), { target: { value: 'Amazing movie!' } });

    // Klik tombol submit
    fireEvent.click(screen.getByText(/submit/i));

    // Tunggu fetch selesai
    await waitFor(() => {
      // Pastikan fetch dipanggil dengan data yang benar
      expect(global.fetch).toHaveBeenCalledWith('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      // Pastikan callback dipanggil dengan data yang benar
      expect(mockOnAddReview).toHaveBeenCalledWith(newReview);
    });
  });

  
  
  
  
});
