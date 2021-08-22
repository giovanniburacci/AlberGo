import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { storeConfig } from './store/store.config';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={storeConfig}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
