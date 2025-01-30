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
router.get(
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
router.get(
  "/editBook",
  authMiddlewares.authenticateToken,
  authMiddlewares.authorizeRole("admin"),
  adminController.editBook
);

module.exports = router;
