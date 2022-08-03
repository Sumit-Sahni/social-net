const express = require('express');
const router = express.Router();
const { updateById, updateLikes, getById, getEverythings,makePostByUser,fetchAllPosts, deletePost} = require('../controllers/postController');






router.route("/:id").put(updateById);
router.route("/:id/likes").put(updateLikes);
router.route("/getbypostid/:id").get(getById);
router.route("/timeline/:userid").get(getEverythings);
router.route("/makepostbyuserid/:id").post(makePostByUser);  
router.route("/fetchallposts").get(fetchAllPosts);
router.route("/delete/:id").delete(deletePost);

module.exports = router;
