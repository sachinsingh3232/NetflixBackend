const router = require('express').Router()

const { createList, deleteList, randomList,getAllList, updateList,getListDetails} = require('../Controllers/listController')
const { isUserAuthenticated, isAdmin } = require('../Middleware/auth')

router.route("/createList").post(isUserAuthenticated, isAdmin, createList);
router.route("/deleteList/:id").delete(isUserAuthenticated, isAdmin, deleteList);
router.route("/randomList").get(isUserAuthenticated,randomList)
router.route("/getAllList").get(isUserAuthenticated,getAllList)
router.route("/getListDetails/:id").get(isUserAuthenticated,getListDetails)
router.route("/updateList/:id").put(isUserAuthenticated, isAdmin, updateList);

module.exports = router