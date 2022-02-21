const express = require('express'),
    router  = express.Router(),
    restaurantController = require('../controllers/restaurantController');


router.get('/register', restaurantController.newRestaurant );

router.post('/create-business', restaurantController.create, restaurantController.redirectView)

module.exports = router