const router = require('express').Router(),
    // courseController = require('../controllers/'),
    homeController = require('../controllers/homeController');


router.get('/courses', homeController.showCourseList);


module.exports = router;