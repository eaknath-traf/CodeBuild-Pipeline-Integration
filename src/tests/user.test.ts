import request from 'supertest';
import app from '../app';
import prisma from '../prisma/client';

// Mock prisma client
jest.mock('../prisma/client', () => ({
  user: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('User API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, email: 'test@example.com', name: 'Test User' }];
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by id', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).get('/api/users/1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return 404 if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/api/users/999');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const newUser = { email: 'new@example.com', name: 'New User' };
      const createdUser = { id: 2, ...newUser };
      (prisma.user.create as jest.Mock).mockResolvedValue(createdUser);

      const res = await request(app).post('/api/users').send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toEqual(createdUser);
      expect(prisma.user.create).toHaveBeenCalledWith({ data: newUser });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user', async () => {
      const updateData = { name: 'Updated Name' };
      const updatedUser = { id: 1, email: 'test@example.com', ...updateData };
      (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const res = await request(app).put('/api/users/1').send(updateData);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(updatedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user', async () => {
      (prisma.user.delete as jest.Mock).mockResolvedValue({ id: 1 });

      const res = await request(app).delete('/api/users/1');

      expect(res.status).toBe(204);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
