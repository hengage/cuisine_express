"use strict";

const Reservation = require('../models/reservationModel');
const Restaurant = require('../models/restaurantModel');
const User = require('../models/userModel')


module.exports = {

    redirectView: (req, res, next) => {
        // Function for redirection to another page 
        // after a successful crud operation

        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    
    makeReservation: async (req, res, next) => {
        const currentUser = req.user;
        // console.log(currentUser)

        if (!currentUser) { 
            req.flash('error', 'Please login to make a reservation')
            res.redirect('/users/login') 
        }

        const restaurant = await Restaurant.findOne({ name: req.params.name })
        if (!restaurant) { console.log('Cant\' find restaurant to create reservation') }

        

        const reservation = await Reservation.create({ 
            reservationDateTime: req.body.reservationDateTime,
            user: currentUser.id,
            restaurant: restaurant.id 
        })
          
        req.flash('success', 'Your reservation has been made')
        res.locals.redirect = `/users/${currentUser.id}`;

        next()
    },


    usersReservation: (req, res, next) => {
        Reservation.find({})
            .then(reservations => {
                res.locals.reservations = reservations;
                next();
            })
            .catch(error => {
                console.log(`Error fetching data ${error.message}`);
                next(error);
            })
    },

    usersReservationView: (req, res) => {
        res.render('reservation/reservation')
    }

}



