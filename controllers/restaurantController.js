"use strict";

const Restaurant = require('../models/restaurantModel');
const passport = require('passport');
const showError = require('../error');
const errorController = require('../controllers/errorController')

const  getRestaurantParams = (body) => {
    return {
        name: body.name,
        email: body.email,
        password: body.password,
        address: body.address,
        zipCode: body.zipCode
    }
};


module.exports = {
    redirectView: (req, res, next) => {
        // Function for redirection to another page 
        // after a successful crud operation

        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

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
            }   else {
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
        // successRedirect: `/` ,
        successFlash: 'Logged in',
        failureRedirect: '/restaurant/login',
        failureFlash: 'Failed to login'
    }), 
        
    restaurantLoginRedirect: (req, res) => {
        let email = req.body.email
        Restaurant.findOne({email})
            .then(restaurant => {
                return res.redirect(`/restaurant/dashboard/${restaurant.name}`)
                next()
            })
            .catch(error => {
                console.log(`Error fetching restaurant by ID: ${error.message}`)
                next(error);
            });
        // res.redirect(`/restaurant/dashboard/${req.body.email}`)
    },

    dashboardView: (req, res, next) => {
        res.render('restaurant/dashboard');
    },


    dashboard: (req, res, next) => {
        let name = req.params.name;
        let id = req.params.id;
        Restaurant.findOne({name}).where('id', id)
            .then(restaurant => {
                
                
                if(!restaurant) {
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
        Restaurant.findOne({name})
            .then(restaurant => {
                res.locals.restaurant = restaurant;
                next();
            })
            .catch(error => {
                console.log(`Error fetching ${restaurnt.name}'s details`);
                next(error);
            })
    },
}