const express = require('express'),
    router = express.Router(),
    restaurantController = require('../controllers/restaurantController');
reservationController = require('../controllers/reservationController');


router.get('/all', restaurantController.getAllRestaurants, restaurantController.getAllRestaurantsView)

router.get('/register', restaurantController.newRestaurant);

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
    restaurantController.showRestaurantReservations,
    restaurantController.dashboard,
    restaurantController.dashboardView,
);


router
    .route('/:name')
    .get(restaurantController.restaurantDetails, restaurantController.restaurantDetailsView)

router.post('/:name', reservationController.makeReservation, reservationController.redirectView)


module.exports = router