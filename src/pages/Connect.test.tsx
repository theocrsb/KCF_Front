import React from 'react';
import { render, screen } from '@testing-library/react';
import Connect from './Connect';

test('renders learn react link', () => {
  render(<Connect />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
