import React from 'react';
import type { Song } from '../types';
import { useStore } from '../state/store';

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="progress" aria-label={`Progress ${Math.round(value * 100)}%`}>
    <div style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }} />
  </div>
);

export const SongsTable: React.FC = () => {
  const { state, issueInvoice } = useStore();
  const { songs, lastClickBySong, loading, error } = state;

  if (loading) return <div className="card">Loading…</div>;
  if (error) return <div className="card" role="alert">{error}</div>;

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Songs</h2>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>ID</th>
            <th>Song name</th>
            <th>Author</th>
            <th style={{ width: 220 }}>Progress</th>
            <th style={{ width: 240 }}>Issue Invoice</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((s: Song) => {
            const last = lastClickBySong[s.id];
            return (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.author}</td>
                <td>
                  <div className="vstack" style={{ gap: 6 }}>
                    <ProgressBar value={s.progress} />
                    <span className="small">{(s.progress * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td>
                  <div className="vstack">
                    <div className="hstack">
                      <button className="button" onClick={() => issueInvoice(s)} aria-label={`Issue invoice for ${s.name}`}>
                        Issue Invoice
                      </button>
                      {last && (
                        <span className="badge" title={`Progress captured at click`}>
                          {Math.round(last.progress * 100)}%
                        </span>
                      )}
                    </div>
                    {last && (
                      <span className="small">Last issued: {new Date(last.timestamp).toLocaleString()}</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
