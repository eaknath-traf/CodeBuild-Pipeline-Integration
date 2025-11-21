import express from 'express';
import userRoutes from './routes/user.routes';
import prisma from './prisma/client';

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

export default app;
