const prisma = require('../prisma/prismaClient');

// Create a new user
const createUser = async (data) => {
  return prisma.user_Testing.create({ data });
};
// INSERT

// Get all users
const getAllUsers = async () => {
  return prisma.user_Testing.findMany();
};

// Get user by ID
const getUserById = async (id) => {
  return prisma.user_Testing.findUnique({ where: { id } });
};

// Update a user
const updateUser = async (id, data) => {
  return prisma.user_Testing.update({ where: { id }, data });
};

// Delete a user
const deleteUser = async (id) => {
  return prisma.user_Testing.delete({ where: { id } });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
