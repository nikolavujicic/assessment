import { render, screen, fireEvent } from '@testing-library/react';
import WeatherPage from './WeatherPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { expect } from 'vitest';

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('WeatherPage', () => {
  it('renders the input and title', () => {
    renderWithQueryClient(<WeatherPage />);
    expect(screen.getByPlaceholderText(/enter city/i)).toBeInTheDocument();
    expect(screen.getByText(/weather widget/i)).toBeInTheDocument();
  });

  it('updates the city input value', () => {
    renderWithQueryClient(<WeatherPage />);
    const input = screen.getByPlaceholderText(/enter city/i);
    fireEvent.change(input, { target: { value: 'Berlin' } });
    expect(input).toHaveValue('Berlin');
  });

  it('shows loading when data is being fetched', () => {
    renderWithQueryClient(<WeatherPage />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});
