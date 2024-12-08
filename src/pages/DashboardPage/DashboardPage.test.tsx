import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import { expect } from 'vitest';

describe('DashboardPage', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Weather')).toBeInTheDocument();

    expect(screen.getByText('Tasks')).toHaveAttribute('href', '/tasks');
    expect(screen.getByText('Weather')).toHaveAttribute('href', '/weather');
  });

  it('applies active class to the active link', () => {
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <DashboardPage />
      </MemoryRouter>
    );

    const tasksLink = screen.getByText('Tasks');
    const weatherLink = screen.getByText('Weather');

    expect(tasksLink).toHaveClass('active');
    expect(weatherLink).not.toHaveClass('active');
  });

  it('renders the correct child component via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/tasks']}>
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            <Route path="tasks" element={<div>Tasks Content</div>} />
            <Route path="weather" element={<div>Weather Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Tasks Content')).toBeInTheDocument();
  });

  it('renders Weather content when navigating to /weather', () => {
    render(
      <MemoryRouter initialEntries={['/weather']}>
        <Routes>
          <Route path="/" element={<DashboardPage />}>
            <Route path="tasks" element={<div>Tasks Content</div>} />
            <Route path="weather" element={<div>Weather Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Weather Content')).toBeInTheDocument();
  });
  it('renders the logout button', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
