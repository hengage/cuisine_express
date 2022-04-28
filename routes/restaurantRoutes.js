const express = require('express'),
    router = express.Router(),
    restaurantController = require('../controllers/restaurantController'),
    reservationController = require('../controllers/reservationController'),
    redirectView = require('../controllers/utils');


router.get(
    '/register', 
    restaurantController.newRestaurant
);

router.post(
    '/create-business', 
    restaurantController.create, 
    redirectView
)

router.get(
    '/login', 
    restaurantController.login
).post(
        '/login',
        restaurantController.authenticate,
        redirectView,
        restaurantController.restaurantLoginRedirect
)

router.get(
    '/dashboard/:name',
    restaurantController.showRestaurantReservations,
    restaurantController.dashboard,
    restaurantController.dashboardView,
);


router
    .route('/:name')
    .get(
        restaurantController.restaurantDetails, 
        restaurantController.restaurantDetailsView
    )

router.post(
    '/:name', 
    reservationController.makeReservation, 
    redirectView
)


module.exports = router