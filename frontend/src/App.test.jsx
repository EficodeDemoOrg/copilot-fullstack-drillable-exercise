// FILE: src/App.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Note: This is a basic test setup. In a real application, you would use a more comprehensive
// testing approach with mocks for API calls and more detailed interaction tests

jest.mock('./pages/Notes', () => () => <div>Notes Component</div>);
jest.mock('./pages/CreateNote', () => () => <div>CreateNote Component</div>);
jest.mock('./pages/EditNote', () => () => <div>EditNote Component</div>);

// Mock fetch API
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { 
        id: 1, 
        title: 'Test Note 1', 
        content: 'Test content 1', 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]),
  })
);

describe('App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  
  test('renders Notes component for the default route', () => {
    render(<App />);
    expect(screen.getByText('Notes Component')).toBeInTheDocument();
  });
  
  test('fetches notes on initial load', async () => {
    render(<App />);
    
    // Verify fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/notes');
  });
});