// src/pages/not-authorized.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { Container, Button } from 'react-bootstrap';

export default function NotAuthorized() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/'); // Arahkan user ke halaman Home
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <Container className="text-center">
        <h1 className="display-4 mb-3">Access Denied</h1>
        <p className="lead mb-4">You do not have permission to access this page.</p>
        <Button variant="light" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </Container>
    </div>
  );
}
