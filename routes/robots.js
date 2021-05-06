const express = require('express');

// create a new Router
const router = express.Router();

// Import
const { getRobots, addRobot, deleteRobot, turnLeft, turnRight, moveForward } = require('../controller/robotsController')

// base path: "http://localhost:3001"
// sub route: '/'
// 

router.route('/')
    .get(getRobots)
    .post(addRobot)
    .delete(deleteRobot);

router.route('/left').post(turnLeft);
router.route('/right').post(turnRight);
router.route('/move').post(moveForward);



//export router to app.js
module.exports = router;
