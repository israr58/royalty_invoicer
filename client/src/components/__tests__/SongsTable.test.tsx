import { render, screen } from '@testing-library/react';
import { SongsTable } from '../SongsTable';
import { StoreProvider } from '../../state/store';

// mock API to resolve immediately
jest.mock('../../services/api', () => ({
  fetchSongs: jest.fn(() => Promise.resolve([])),
  fetchInvoices: jest.fn(() => Promise.resolve([])),
  createInvoice: jest.fn()
}));

test('renders Songs table (empty state)', async () => {
  render(
    <StoreProvider>
      <SongsTable />
    </StoreProvider>
  );

  // Wait for the table header to show up
  expect(await screen.findByText(/Songs/i)).toBeInTheDocument();
});
