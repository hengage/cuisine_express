"use strict";

const Restaurant = require('../models/restaurantModel'),
    Reservation = require('../models/reservationModel');
const passport = require('passport');
const showError = require('../error');

const getRestaurantParams = (body) => {
    return {
        name: body.name,
        email: body.email,
        password: body.password,
        address: body.address,
        zipCode: body.zipCode
    }
};


module.exports = {
    newRestaurant: (req, res) => {
        res.render('restaurant/newRestaurant')
    },

    create: (req, res, next) => {
        if (req.skip) next();

        let newRestaurant = new Restaurant(getRestaurantParams(req.body));

        Restaurant.register(newRestaurant, req.body.password, (error, restaurant) => {
            if (restaurant) {
                req.flash(
                    "success",
                    `Your business, ${newRestaurant.name} has been successfully registered`
                );
                res.locals.redirect = '/';
                next();
            } else {
                req.flash(
                    "error",
                    `Failed to create restaurant account because: ${error.message}.`
                );
                res.locals.redirect = '/restaurant/register';
                next()
            }
        });
    },

    login: (req, res) => {
        res.render('restaurant/login');
    },

    authenticate: passport.authenticate('restaurantLocal', {
        successFlash: 'Logged in',
        failureRedirect: '/restaurant/login',
        failureFlash: 'Failed to login'
    }),

    restaurantLoginRedirect: (req, res) => {
        let email = req.body.email
        Restaurant.findOne({ email })
            .then(restaurant => {
                return res.redirect(`/restaurant/dashboard/${restaurant.name}`)
                next()
            })
            .catch(error => {
                console.log(`Error fetching restaurant by ID: ${error.message}`)
                next(error);
            });
    },

    dashboardView: (req, res, next) => {
        res.render('restaurant/dashboard');
    },


    dashboard: (req, res, next) => {
        let name = req.params.name;
        let id = req.params.id;
        Restaurant.findOne({ name }).where('id', id)
            .then(restaurant => {


                if (!restaurant) {
                    return showError(res, 404)
                }
                res.locals.restaurant = restaurant;
                next();
            })
            .catch(error => {
                console.log('Error showing dashboard');
                next(error);
            })
    },

    showRestaurantReservations: async (req, res, next) => {
        let restaurantName = await req.params.name;
        console.log('The restaurant found is:', restaurantName)
        try {
            var restaurantsReservations = await Reservation.find({restaurantName})
                .populate('restaurant' )
                .populate({path:'user'})
        } catch (error) {
            console.log('You have an error:', error)
        }
        res.locals.restaurantsReservations = restaurantsReservations

        next()
    },

    getAllRestaurants: (req, res, next) => {
        Restaurant.find({})
            .then(restaurants => {
                res.locals.restaurants = restaurants;
                next();
            })
            .catch(error => {
                console.log(`Error fetching restaurant ${error.message}`);
                next(error);
            });
    },

    getAllRestaurantsView: (req, res) => {
        res.render('restaurant/allRestaurants');
    },

    restaurantDetailsView: (req, res) => {
        res.render('restaurant/restaurantDetails');
    },

    restaurantDetails: (req, res, next) => {
        let name = req.params.name;
        console.log(name)
        let id = req.params.id;
        Restaurant.findOne({ name })
            .then(restaurant => {
                if (!restaurant) {
                    return showError(res, 404)
                }
                res.locals.restaurant = restaurant;
                next();
            })
            .catch(error => {
                console.log(`Error fetching ${restaurnt.name}'s details`);
                next(error);
            })
    },
}