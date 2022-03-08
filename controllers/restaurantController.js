"use strict";

const Restaurant = require('../models/restaurantModel');
const passport = require('passport');

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
        successRedirect: '/restaurant/dashboard',
        successFlash: 'Logged in',
        failureRedirect: '/restaurant/login',
        failureFlash: 'Failed to login'
    }, console.log('businesssss')),

    dashboardView: (req, res, next) => {
        res.render('restaurant/dashboard');
    },

    // dashboard: (req, res, next) => {
    //     let restaurantId = req.params.id;
    //     Restaurant.findById(restaurantId)
    //         .then(restaurant => {
    //             res.locals.restaurant = restaurant;
    //             next();
    //         })
    //         .catch(error => {
    //             console.log('Error fetching profile')
    //             next(error);
    //         })
    // }

    dashboard: (req, res, next) => {
        let name = req.params.name;
        let id = req.params.id;
        Restaurant.findOne({name}).where('id', id)
            .then(restaurant => {
                res.locals.restaurant = restaurant;
                next();
            })
            .catch(error => {
                console.log('Error fetching profile')
                res.locals.redirect = '/'
                next(error);
            })
    }


}