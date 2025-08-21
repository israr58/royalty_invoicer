import request from 'supertest';
import express from 'express';
import cors from 'cors';
import router from './routes';

function makeApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', router);
  return app;
}

test('GET /api/songs returns 10 songs', async () => {
  const app = makeApp();
  const res = await request(app).get('/api/songs');
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(10);
  expect(res.body[0]).toHaveProperty('name');
});

test('POST /api/invoices creates invoice', async () => {
  const app = makeApp();
  const songsRes = await request(app).get('/api/songs');
  const song = songsRes.body[0];
  const res = await request(app).post('/api/invoices').send({ songId: song.id, progress: song.progress });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body.songId).toBe(song.id);
});
