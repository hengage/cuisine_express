"use strict";

const Restaurant = require('../models/restaurantModel');
const passport = require('passport');

const  getUserParams = (body) => {
    return {
        name: body.name,
        email: body.email,
        password: body.password
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

    create: (req, res, next) => {
        if (req.skip) next();

        let newRestaurant = new Restaurant(getUserParams(req.body));

        Restaurant.register(newRestaurant, req.body.password, (error, restaurant) => {
            if (restaurant) {
                req.flash("success", `${user.name}'s account created successfully`);
                res.locals.redirect = '/';
                next();
            }   else {
                req.flash("error", `Failed to create restaurant account because: ${error.message}.`);
                res.locals.redirect = 'restaurant/signup';
                next()
            }
        });
    },
}