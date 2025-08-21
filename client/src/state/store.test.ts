import { reducer, initial } from './store';

const makeInvoice = (songId = 1) => ({
  id: 'x', songId, songName: 'Flowers', author: 'Miley Cyrus', progress: 0.15, timestamp: '2025-01-01T00:00:00.000Z'
});

test('INVOICE_ISSUED updates invoices and lastClickBySong', () => {
  const state = reducer(initial, { type: 'INVOICE_ISSUED', invoice: makeInvoice(1) } as any);
  expect(state.invoices.length).toBe(1);
  expect(state.lastClickBySong[1]).toEqual({ timestamp: '2025-01-01T00:00:00.000Z', progress: 0.15 });
});
