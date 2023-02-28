import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather app', () => {
  render(<App />);
  const linkElement = screen.getByRole('heading', { name: /weather/i });
  expect(linkElement).toBeInTheDocument();
});
