const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();
const authMiddlewares = require("../middlewares/authMiddleware");

router.post(
  "/rentBook",
  authMiddlewares.authenticateToken,
  authMiddlewares.authorizeRole("admin"),
  adminController.rentBook
);
router.put(
  "/returnBook",
  authMiddlewares.authenticateToken,
  authMiddlewares.authorizeRole("admin"),
  adminController.returnBook
);
router.post(
  "/addBook",
  authMiddlewares.authenticateToken,
  authMiddlewares.authorizeRole("admin"),
  adminController.addBook
);
router.put(
  "/editBook/:id",
  authMiddlewares.authenticateToken,
  authMiddlewares.authorizeRole("admin"),
  adminController.editBook
);
router.get(
  "/getCustomers",
  authMiddlewares.authenticateToken,
  authMiddlewares.authorizeRole("admin"),
  adminController.getCustomers
);

module.exports = router;
