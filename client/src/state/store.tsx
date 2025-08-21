import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { Song, Invoice } from '../types';
import { fetchSongs, fetchInvoices, createInvoice } from '../services/api';

export type State = {
  songs: Song[];
  invoices: Invoice[];
  lastClickBySong: Record<number, { timestamp: string; progress: number } | undefined>;
  loading: boolean;
  error?: string;
};

export type Action =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; songs: Song[]; invoices: Invoice[] }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'INVOICE_ISSUED'; invoice: Invoice };

const initial: State = { songs: [], invoices: [], lastClickBySong: {}, loading: false };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: undefined };
    case 'LOAD_SUCCESS': {
      const lastClickBySong: State['lastClickBySong'] = {};
      for (const inv of action.invoices) {
        if (!lastClickBySong[inv.songId] || new Date(inv.timestamp) > new Date(lastClickBySong[inv.songId]!.timestamp)) {
          lastClickBySong[inv.songId] = { timestamp: inv.timestamp, progress: inv.progress };
        }
      }
      return { ...state, loading: false, songs: action.songs, invoices: action.invoices, lastClickBySong };
    }
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'INVOICE_ISSUED': {
      const inv = action.invoice;
      return {
        ...state,
        invoices: [inv, ...state.invoices],
        lastClickBySong: { ...state.lastClickBySong, [inv.songId]: { timestamp: inv.timestamp, progress: inv.progress } }
      };
    }
    default:
      return state;
  }
}

const StoreCtx = createContext<{ state: State; issueInvoice: (song: Song) => Promise<void> } | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: 'LOAD_START' });
        const [songs, invoices] = await Promise.all([fetchSongs(), fetchInvoices()]);
        dispatch({ type: 'LOAD_SUCCESS', songs, invoices });
      } catch (e: any) {
        dispatch({ type: 'LOAD_ERROR', error: e.message || String(e) });
      }
    })();
  }, []);

  const issueInvoice = async (song: Song) => {
    const invoice = await createInvoice({ songId: song.id, progress: song.progress });
    dispatch({ type: 'INVOICE_ISSUED', invoice });
  };

  return <StoreCtx.Provider value={{ state, issueInvoice }}>{children}</StoreCtx.Provider>;
};

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error('StoreProvider missing');
  return ctx;
}

export { reducer, initial };
