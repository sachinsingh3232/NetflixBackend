const router = require('express').Router()

const { register, login, LogOut, Update, Delete, getUserDetails, getAllUsers, NumberOfUsersEveryMonth,makeAdmin } = require('../Controllers/userController')
const { isUserAuthenticated, isAdmin } = require('../Middleware/auth')

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(LogOut)
router.route("/Update").put(isUserAuthenticated, Update)
router.route("/makeAdmin/:id").put(makeAdmin)
router.route("/delete/:id").delete(isUserAuthenticated, Delete);
router.route("/getUserDetails/:id").get(isUserAuthenticated, isAdmin, getUserDetails);
router.route("/getAllUsers").get(isUserAuthenticated, isAdmin, getAllUsers);
router.route("/NumberOfUsersEveryMonth").get(isUserAuthenticated, isAdmin, NumberOfUsersEveryMonth);

module.exports = router