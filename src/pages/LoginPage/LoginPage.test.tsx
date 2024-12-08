import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import { login } from '../../services/auth';

vi.mock('../../services/auth', () => ({
  login: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('LoginPage', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
    vi.clearAllMocks();
  });

  it('renders email and password fields and login button', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls login and navigates on successful submission', async () => {
    (login as vi.Mock).mockResolvedValueOnce({ token: 'test-token' });
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(login).toHaveBeenCalledTimes(1);
    await screen.findByText('Login');


    expect(mockNavigate).toHaveBeenCalledWith('/tasks');
  });

  it('displays error message on failed login', async () => {
    (login as vi.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);
    const errorMessage = await screen.findByText('Invalid credentials');
    expect(errorMessage).toBeInTheDocument();
  });

  it('navigates to tasks if token exists in localStorage', () => {
    localStorage.setItem('token', 'test-token');
    render(<LoginPage />);

    expect(mockNavigate).toHaveBeenCalledWith('/tasks');
    localStorage.removeItem('token');
  });
});
