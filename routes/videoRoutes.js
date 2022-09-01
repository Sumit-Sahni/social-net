const express = require('express');
const router = express.Router();
const {createVideos, videoDelete,  vidFindById} = require('../controllers/videoController');

router.route('/create/:id',).post(createVideos);
router.route('/delete/:id',).put(videoDelete);
router.route('/video/:id',).get(vidFindById);



module.exports = router;
 