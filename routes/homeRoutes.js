const router = require('express').Router(),
    homeController = require('../controllers/homeController'),
    restaurantController = require('../controllers/restaurantController');


 router.get('/', restaurantController.getAllRestaurants, homeController.homePageController);

 
 module.exports = router;

