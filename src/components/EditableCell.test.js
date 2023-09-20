import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux'; // Redux Provider
import configureMockStore from 'redux-mock-store';

import {initialState} from '../../tests/initialState'; // example of working Initial state for test purposes
import {updateRate} from '../reducers/commonSlice.ts';
import EditableCell from './EditableCell';
import {ExchangeType} from '../app/enums';

// Create a mock Redux store
const mockStore = configureMockStore();
const store = mockStore(initialState);

const currencyLabel = 'UAH/EUR';
const initValue = 41.5;
const editedValue = 40;

test('renders initial cell value', () => {
  render(
    <Provider store={store}>
      <EditableCell exchangeType={ExchangeType.Buy} rateLabel={currencyLabel} rateValue={41.5} />
    </Provider>
  );
  const textElement = screen.getByText(initValue);
  expect(textElement).toBeInTheDocument();
});

test('can edit and save text (checling proper payload of the updateRate action)', () => {
  render(
    <Provider store={store}>
      <EditableCell exchangeType={ExchangeType.Buy} rateLabel={currencyLabel} rateValue={41.5} />
    </Provider>
  );

  const textElement = screen.getByText(initValue);
  userEvent.hover(textElement); // Simulate mouse hover

  // Click the edit icon to start editing
  const editButton = screen.getByText('✎');
  fireEvent.click(editButton);

  // Get the input field and type new text
  const inputElement = screen.getByDisplayValue(initValue);
  fireEvent.change(inputElement, {target: {value: editedValue}});

  // Click the save button
  const saveButton = screen.getByText('✔️');
  fireEvent.click(saveButton);

  // Assert that the save action was dispatched (Redux state changed)
  const actions = store.getActions();
  expect(actions).toContainEqual(
    updateRate({exchangeType: ExchangeType.Buy, rateLabel: 'UAH/EUR', rateValue: editedValue})
  );
});

test('can edit and cancel editing', () => {
  render(
    <Provider store={store}>
      <EditableCell exchangeType={ExchangeType.Buy} rateLabel={currencyLabel} rateValue={41.5} />
    </Provider>
  );

  // Click the edit icon to start editing
  const editButton = screen.getByText('✎');
  fireEvent.click(editButton);

  // Get the input field and type new text
  const inputElement = screen.getByDisplayValue(initValue);
  fireEvent.change(inputElement, {target: {value: editedValue}});

  // Click the cancel button
  const cancelButton = screen.getByText('❌');
  fireEvent.click(cancelButton);

  // Verify the initial text is displayed
  const initialTextElement = screen.getByText(initValue);
  expect(initialTextElement).toBeInTheDocument();
});
