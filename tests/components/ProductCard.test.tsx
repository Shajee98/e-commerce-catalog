import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../../src/components/ProductCard';

test('renders ProductCard with correct data', () => {
  render(
    <ProductCard
      title="Test Product"
      price={99.99}
      image="https://via.placeholder.com/150"
      rating={{ rate: 4.5, count: 10 }}
    />
  );
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
  expect(screen.getByText(/4.5/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Test Product/i)).toHaveAttribute('src', 'https://via.placeholder.com/150');
});

test('displays rating stars correctly', () => {
  render(
    <ProductCard
      title="Test Product"
      price={99.99}
      image="https://via.placeholder.com/150"
      rating={{ rate: 4.5, count: 10 }}
    />
  );
  expect(screen.getByText(/4.5/i)).toBeInTheDocument();
  expect(screen.getByText('★★★★★')).toBeInTheDocument();  // Assuming you are rendering stars as text or icons.
});