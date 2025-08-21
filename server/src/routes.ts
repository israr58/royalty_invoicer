import { Router, Request, Response } from "express";
import { songs, invoices } from "./data";
import { randomUUID } from "crypto";

const router = Router();

router.get("/songs", (_req: Request, res: Response) => {
  res.json(songs);
});

router.get("/invoices", (_req: Request, res: Response) => {
  res.json(invoices);
});

router.post("/invoices", (req: Request, res: Response) => {
  const { songId, progress } = req.body as {
    songId?: number;
    progress?: number;
  };
  if (typeof songId !== "number") {
    return res.status(400).json({ error: "songId (number) is required" });
  }
  const song = songs.find((s) => s.id === songId);
  if (!song) {
    return res.status(404).json({ error: "Song not found" });
  }

  const captured = typeof progress === "number" ? progress : song.progress;

  const invoice = {
    id: randomUUID(),
    songId: song.id,
    songName: song.name,
    author: song.author,
    progress: captured,
    timestamp: new Date().toISOString(),
  };
  invoices.unshift(invoice);
  res.status(201).json(invoice);
});

export default router;
