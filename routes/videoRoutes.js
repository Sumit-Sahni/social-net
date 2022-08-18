const express = require('express');
const router = express.Router();
const createVideos = require('../controllers/videoController');

router.route('/create/:id',).post(createVideos);


module.exports = router;
 