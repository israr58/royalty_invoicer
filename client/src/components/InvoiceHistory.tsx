import React from 'react';
import { useStore } from '../state/store';

export const InvoiceHistory: React.FC = () => {
  const { state } = useStore();
  const { invoices } = state;
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Invoice History</h2>
      {invoices.length === 0 ? (
        <div className="small">No invoices yet.</div>
      ) : (
        <ul>
          {invoices.map((inv) => (
            <li key={inv.id} style={{ marginBottom: 8 }}>
              <strong>{new Date(inv.timestamp).toLocaleString()}</strong> — {inv.author} — <em>{inv.songName}</em> — {Math.round(inv.progress * 100)}%
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
