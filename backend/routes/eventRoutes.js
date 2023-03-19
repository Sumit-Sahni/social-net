const express = require('express');
const router = express.Router();
const {createEvent, getAllEvents, deleteEvent} = require('../controllers/eventController');


router.route("/").post(createEvent);
router.route("/").get(getAllEvents);
router.route("/:id").delete(deleteEvent);


module.exports = router;
