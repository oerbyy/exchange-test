import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Converter from './Converter';
import {initialState} from '../../tests/initialState';
import {updateAmount, updateCurrency} from '../reducers/commonSlice';
import {ExchangeType} from '../app/enums';

const mockStore = configureMockStore();
let store = mockStore(initialState);

test('renders Converter component and interacts with it', async () => {
  render(
    <Provider store={store}>
      <Converter />
    </Provider>
  );

  // Test initial rendering
  expect(screen.getByText('Change')).toBeInTheDocument();
  expect(screen.getByLabelText('Sell currency')).toBeInTheDocument();
  expect(screen.getByText('Buy:')).toBeInTheDocument();
});

test('tests Buy functionality and calculations', async () => {
  render(
    <Provider store={store}>
      <Converter />
    </Provider>
  );

  const editedValue = 100;

  // Simulate user interaction
  const sellAmountInput = screen.getByPlaceholderText('Change');
  fireEvent.change(sellAmountInput, {target: {value: editedValue}});

  // Assert that the save action was dispatched (Redux state changed)
  const actions = store.getActions();
  expect(actions).toEqual(
    expect.arrayContaining([
      expect.objectContaining(
        updateAmount({sellAmount: editedValue, buyAmount: 2.4096385542168677})
      ),
    ])
  );
});

test('tests Sell functionality and calculations', async () => {
  render(
    <Provider store={store}>
      <Converter />
    </Provider>
  );

  const editedValue = 100;

  // Simulate user interaction
  const sellAmountInput = screen.getByPlaceholderText('Get');
  fireEvent.change(sellAmountInput, {target: {value: editedValue}});

  // Assert that the save action was dispatched (Redux state changed)
  const actions = store.getActions();
  expect(actions).toEqual(
    expect.arrayContaining([
      expect.objectContaining(updateAmount({sellAmount: 4150, buyAmount: editedValue})),
    ])
  );
});
