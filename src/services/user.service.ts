import prisma from '../prisma/client';
import { User } from '@prisma/client';

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = async (data: { email: string; name?: string }): Promise<User> => {
  return await prisma.user.create({
    data,
  });
};

export const updateUser = async (
  id: number,
  data: { email?: string; name?: string },
): Promise<User> => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number): Promise<User> => {
  return await prisma.user.delete({
    where: { id },
  });
};
