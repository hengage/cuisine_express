const express = require('express'),
    router  = express.Router(),
    reservationController = require('../controllers/reservationController');
    restaurantController = require('../controllers/restaurantController');

router.post(
    '/:name', 
    reservationController.makeReservation, 
    reservationController.redirectView,
)

router.get('', reservationController.usersReservation, reservationController.usersReservationView)

module.exports = router