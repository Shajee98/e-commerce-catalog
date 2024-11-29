import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../../src/pages/Home';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import React from 'react';

test('renders Home with search and sort functionality', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  // Test if search bar is rendered
  expect(screen.getByPlaceholderText(/Search for products.../i)).toBeInTheDocument();

  // Get the select element (combobox)
  const sortSelect = screen.getByRole('combobox');
  console.log(sortSelect);  // Log to see what is returned by the query

  // Test sorting functionality
  fireEvent.change(sortSelect, { target: { value: 'price' } });

  // Ensure the value has been updated to 'price'
  expect(sortSelect).toHaveValue('price');  // Using the toHaveValue matcher
});