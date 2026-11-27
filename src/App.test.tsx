import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import store from './states/store';

jest.mock('axios', () => ({ __esModule: true, default: { get: jest.fn(), post: jest.fn(), put: jest.fn() } }));

const open = (path: string) =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </Provider>
  );

beforeAll(() => {
  window.scrollTo = jest.fn();
  (window as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
beforeEach(() => localStorage.clear());

test('home page shows the main heading', async () => {
  open('/');
  expect(await screen.findByRole('heading', { level: 1, name: /AI-Driven Solutions for a Smarter Tomorrow/i }, { timeout: 15000 })).toBeInTheDocument();
}, 20000);

test.each(['/LogIn', '/AdminPanel', '/AdminPanel/VendorTable', '/AdminPanel/CustomerTable'])('%s is closed and shows the home page', async (path) => {
  open(path);
  expect(await screen.findByRole('heading', { level: 1, name: /AI-Driven Solutions for a Smarter Tomorrow/i }, { timeout: 15000 })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Log In' })).toBeNull();
}, 20000);
