const express = require('express'),
    router  = express.Router(),
    reservationController = require('../controllers/reservationController');
    restaurantController = require('../controllers/restaurantController');

router.post(
    '', 
    reservationController.makeReservation, 
    reservationController.redirectView,
)

router.get('', reservationController.usersReservation, reservationController.usersReservationView)

module.exports = router