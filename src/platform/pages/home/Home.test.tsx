import { describe, it, expect } from 'vitest';
import OndergrondHome from './Home';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders main heading', () => {
    render(<OndergrondHome />);

    expect(screen.getByTestId('home-main-header')).toBeInTheDocument();
    expect(screen.getByTestId('home-main-header')).toHaveTextContent(
      'Welcome to the Ondergrond'
    );
  });

  it('renders without crashing', () => {
    render(<OndergrondHome />);

    // Basic smoke test - component should render
    expect(document.body).toBeInTheDocument();
  });
});
