import React from 'react';
import App from '../src/App';
import { render, screen, fireEvent } from '@testing-library/react';

test('App renders without crashing', () => {
  render(<App />);
  expect(screen.getByText(/E-commerce Product Catalog/i)).toBeInTheDocument();
});

test('Dark mode toggle works', () => {
  render(<App />);
  const toggleButton = screen.getByText(/Toggle Dark Mode/i);
  fireEvent.click(toggleButton);
  expect(document.body.classList.contains('dark')).toBe(true);
  fireEvent.click(toggleButton);
  expect(document.body.classList.contains('dark')).toBe(false);
});