import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AppClass from './AppClass';

// Write your tests here
test('sanity', () => {
 
  expect(true).toBe(true)
})

test('render the header to be exact Welcome to the Grid', ()=>{
  render(<AppClass.js/>)
  const header = screen.queryByText(/welcome to the grid/i);
  expect(header).toBeInTheDocument();
})
