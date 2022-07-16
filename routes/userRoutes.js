const express = require('express');
const {  registerUser,   authUser,   getUser,    getUserById,    updateUser, followUser, unfollowUser} = require('../controllers/userController');
const router = express.Router();
  


router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(getUser);
router.route("/userbyid/:id").get(getUserById);
router.route("/:id").put(updateUser);
router.route("/:id/follow").put(followUser);
router.route("/:id/unfollow").put(unfollowUser);



module.exports = router;
