const express = require('express');
const {  registerUser,   authUser,   getUser,    getUserById,    updateUser, followUser, unfollowUser, adminAuth,deleteUser,userByFollowers} = require('../controllers/userController');
const router = express.Router();
  


router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/").get(getUser);
router.route("/userbyid/:id").get(getUserById);
router.route("/:id").put(updateUser);
router.route("/:id/follow").put(followUser);
router.route("/:id/unfollow").put(unfollowUser);
router.route("/admin").post(adminAuth);
router.route("/delete/:id").delete(deleteUser);
router.route("/userbyfollowers/:id").get(userByFollowers);




module.exports = router;
