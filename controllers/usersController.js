const User = require('../models/userModel');
const passport = require('passport');
const { check, validationResult} = require("express-validator")
 
const  getUserParams = (body) => {
    return {
        name: {
            first: body.first,
            last: body.last
        },

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

    validateNewUser: (req, res, next) => {[
        check('email', 'invalid email').not().isEmpty(),
        check(
            'password', 
            'Your password must be at least 5 characters')
                .not().isEmpty().isLength({min: 5}),
        check('first', 'First name should not be empty').not().isEmpty(),
        check('lasst', 'Last name should not be empty').not().isEmpty()
    ];
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // console.log(`Error: ${errors.array()}`);
            let messages = errors.array().map(e => e.msg);
            req.flash("error", messages.join(" and "));
            req.skip = true;
            res.locals.redirect = "users/signup";
            console.log('erorrrrrr');
            next();
        } else {
            next();
        };
    },

    create: (req, res, next) => {
        if (req.skip) next();

        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (user) {
                req.flash("success", `${user.fullName}'s account created successfully`);
                res.locals.redirect = '/users';
                next();
            }   else {
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                res.locals.redirect = 'users/signup';
                next()
            }
        });
    },

    login: (req, res) => {
        res.render('users/login')
    },

    authenticate: passport.authenticate('userLocal', {
        // successRedirect: '/',
        successFlash: 'Logged in',
        failureRedirect: '/users/login',
        failureFlash: 'Failed to loginNNN'
    },console.log('userrrrrr')),

    userLoginRedirect: (req, res, next) => {
        let email = req.body.email
        User.findOne({email})
            .then(user => {
                res.redirect(`/users/${user.id}`)
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`)
                next(error);
            });
    },

    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = '/';
        next();
    },

    userProfile: (req, res, next) => {
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
    },

    editUserProfile: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render('users/editUserProfile', {
                    user: user
                });
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            })
    },

    updateUserProfile: (req, res, next) => {
        let userId = req.params.id,
        userParams = getUserParams(req.body);

        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                req.flash("success", `Profile update successful!`);
                res.locals.redirect = `/users/${userId}`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                req.flash("error", `Profile update failed!`);
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
            })
    },

    deleteUSer: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                req.flash("success", `Account deleted successfully!`);
                res.locals.redirect = '/users';
                next();
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    }
}