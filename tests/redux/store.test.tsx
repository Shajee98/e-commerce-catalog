import React from 'react';
import { Provider } from 'react-redux'; // Correct import
import { store } from '../../src/redux/store'; // Make sure this path is correct
import Home from '../../src/pages/Home'; // Adjust path to your Home component
import { render, screen, fireEvent } from '@testing-library/react';

test('sets search query in Redux store', () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  // Type into search input and trigger Redux action
  fireEvent.change(screen.getByPlaceholderText(/Search for products.../i), { target: { value: 'test' } });

  // Ensure that the search query is updated in the Redux store
  expect(store.getState().products.searchQuery).toBe('test');
});