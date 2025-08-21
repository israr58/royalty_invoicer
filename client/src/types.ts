export type Song = {
  id: number;
  name: string;
  author: string;
  progress: number;
};
export type Invoice = {
  id: string;
  songId: number;
  songName: string;
  author: string;
  progress: number;
  timestamp: string;
};
