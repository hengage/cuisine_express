"use strict";

const Reservation = require('../models/reservationModel');
const Restaurant = require('../models/restaurantModel');
const User = require('../models/userModel'),
nodemailer = require('nodemailer');
const makeReservationConfirmEmail = require('../emailSender')


module.exports = {
    
    makeReservation: async (req, res, next) => {
        const currentUser = req.user;
        // console.log(currentUser.email)

        if (!currentUser) { 
            req.flash('error', 'Please login to make a reservation')
            res.redirect('/users/login') 
        }

        const restaurant = await Restaurant.findOne({ name: req.params.name })
        console.log('The restaurant found is', restaurant.name)
        if (!restaurant) { console.log('Cant\' find restaurant to create reservation') }

        await Reservation.create({ 
            reservationDateTime: req.body.reservationDateTime,
            user: currentUser.id,
            restaurant: restaurant.id 
        })
          
        req.flash('success', 'Your reservation has been made')
        makeReservationConfirmEmail(currentUser, restaurant.name, req.body.reservationDateTime)
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



