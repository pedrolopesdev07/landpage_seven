import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the hero heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /transforme sua presença digital/i })).toBeInTheDocument();
  });
});
