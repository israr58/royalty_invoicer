import React from 'react';
import { SongsTable } from './components/SongsTable';
import { InvoiceHistory } from './components/InvoiceHistory';

export default function App() {
  return (
    <div className="container vstack">
      <h1 style={{ margin: 0 }}>Royalty Invoicer</h1>
      <p className="small">Issue invoices once progress looks good. Data is local.</p>
      <SongsTable />
      <InvoiceHistory />
    </div>
  );
}
