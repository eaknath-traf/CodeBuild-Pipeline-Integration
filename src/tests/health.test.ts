import request from 'supertest';
import app from '../app';
import prisma from '../prisma/client';

describe('Health Check API', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should return 200 and database connected status', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', database: 'connected' });
  });
});
