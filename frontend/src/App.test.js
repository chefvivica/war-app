import { render, screen } from '@testing-library/react';
import App from './App';

test('initializes Game', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to war/i);
  expect(linkElement).toBeInTheDocument();
});
