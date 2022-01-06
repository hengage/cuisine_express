const User = require('../models/userModel');

module.exports = {
    index:  (req, res, next) => {
        User.find({})
         .then(users => {
            res.locals.users = users;
                next();
         })
         .catch(error => {
            console.log(`Error fetching users ${error.message}`);
            next(error);
        });
    },

    indexView: (req, res) => {
        res.render('users/index');
    },

    newUser: (req, res) => {
        res.render('users/newUser')
    },

    create: (req, res, next) => {
        let userParams ={
            name: {
                first: req.body.first,
                last: req.body.last
            },

            email: req.body.email,
            password: req.body.password
        };

        User.create(userParams)
            .then(user => {
                res.locals.redirect = '/users';
                res.locals.user = user;
                next()
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                next(error);
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    userProfile : (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`)
                next(error);
            });
    },

    userProfileView: (req, res) => {
        res.render('users/userProfile');
    }
}