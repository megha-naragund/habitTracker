const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitsController");


//post request
router.route('/habit/add').post (habitController.add);
router.route('/habit/update').post(habitController.changeStatus);
router.route('/habit/delete').post(habitController.deleteHabit);

//get request
router.route('/habit').get (habitController.getHabits);
router.route('/habits/weekView').get (habitController.weekView);
router.route('/habit/getStreak').get(habitController.getMaxStreak);

module.exports = router;