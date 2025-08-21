import type { Song, Invoice } from "../types";
import { API_URL } from "../env";

export async function fetchSongs(): Promise<Song[]> {
  const res = await fetch(`${API_URL}/songs`);
  if (!res.ok) throw new Error("Failed to fetch songs");
  return res.json();
}

export async function fetchInvoices(): Promise<Invoice[]> {
  const res = await fetch(`${API_URL}/invoices`);
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
}

export async function createInvoice(payload: {
  songId: number;
  progress: number;
}): Promise<Invoice> {
  const res = await fetch(`${API_URL}/invoices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create invoice");
  return res.json();
}
