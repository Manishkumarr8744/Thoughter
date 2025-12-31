const express = require("express")
const router = express.Router();

const { registerUser,loginUser, logout, getUserDetails, updateUser, UpdateUserPassword, getAllUsers,updateUserRole ,deleteUser } = require("../controllers/userController");
const { isAuthenticated, authorizeRole } = require("../Middlewares/authentication");


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated, getUserDetails)
router.route("/me/update").put(isAuthenticated, updateUser)
router.route("/password/update").put(isAuthenticated, UpdateUserPassword)

//Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeRole("admin"), getAllUsers)
router.route("/admin/user/:id").put(isAuthenticated, authorizeRole("admin"), updateUserRole).delete(isAuthenticated,authorizeRole("admin"),deleteUser)



module.exports = router