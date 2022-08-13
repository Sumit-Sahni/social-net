const express = require('express');
const router = express.Router();
const createVideos = require('../controllers/videoController');

router.route('/create',).post(createVideos);


module.exports = router;
 