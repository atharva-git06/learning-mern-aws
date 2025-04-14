const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin-controller")
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require("../middlewares/admin-middleware");

router.route("/users").get(authMiddleware, adminMiddleware , adminController.getAllUsers);
router.route("/contacts").get(authMiddleware, adminMiddleware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById);
router.route("/users/delete/:id").delete(authMiddleware,adminMiddleware,adminController.deleteUser);
router.route('/users/update/:id').patch(authMiddleware,adminMiddleware,adminController.updateUserById)
router.route("/users/:id").get(authMiddleware, adminMiddleware , adminController.getUserById);


module.exports = router;