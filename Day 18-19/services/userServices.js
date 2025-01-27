const prisma = require('../prisma/prismaClient');

// Create a new user
const createUser = async (data) => {
  return prisma.user.create({ data });
};
// INSERT

// Get all users
const getAllUsers = async () => {
  return prisma.user.findMany();
};

// Get user by ID
const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

// Update a user
const updateUser = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

// Delete a user
const deleteUser = async (id) => {
  return prisma.user.delete({ where: { id } });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
