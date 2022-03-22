const express = require('express'),
    router  = express.Router(),
    restaurantController = require('../controllers/restaurantController');
    

router.get('/all', restaurantController.getAllRestaurants, restaurantController.getAllRestaurantsView)

router.get('/register', restaurantController.newRestaurant );

router.post('/create-business', restaurantController.create, restaurantController.redirectView)

router.get('/login', restaurantController.login)
.post(
    '/login',
    restaurantController.authenticate,
    restaurantController.redirectView, 
    restaurantController.restaurantLoginRedirect
)

// router.get('/dashboard/:id', restaurantController.dashboardView, restaurantController.dashboard);
router.get(
    '/dashboard/:name',
    restaurantController.dashboard, 
    restaurantController.dashboardView,
);

router.get(
    '/:name', 
    restaurantController.restaurantDetails, 
    restaurantController.restaurantDetailsView,
)


module.exports = router