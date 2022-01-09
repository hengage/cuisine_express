const User = require('../models/userModel');
 
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

    create: (req, res, next) => {
        let userParams = getUserParams(req.body);

        User.create(userParams)
            .then(user => {
                req.flash("success", `Thank you for signing up ${user.fullName}`)
                res.locals.redirect = '/users';
                res.locals.user = user;
                next()
            })
            .catch(error => {
                res.locals.redirect = "users/signup"
                console.log(`Error saving user: ${error.message}`);
                req.flash("error", `Signup unsuccessful. ${error.message}` )
                next(error);
            });
    },

    login: (req, res) => {
        res.render('users/login')
    },

    authenticate: (req, res, next) => {
        User.findOne({
            email: req.body.email
        })
        .then(user => {
            if (user) {
                user.passwordComparison(req.body.password)
                    .then(passwordsMatch => {
                        if (passwordsMatch) {
                            console.log(req.body.password);
                            console.log(user.email);
                            console.log(user.password);
                            req.flash('success', 'Login successul!');
                            res.locals.redirect = '/';
                            res.locals.user = user;
                            next();
                        } else {
                            console.log(req.body.password);
                            console.log(user.email);
                            console.log(user.password);
                            req.flash('error', 'Incorrect password');
                            res.locals.redirect = '/users/login';
                            next()
                        }
                    });
            } else {
                req.flash('error', 
                    'No account exists with this email.',
                    'Please sign up if you do not have an account'
                );
                res.locals.redirect = '/users/login';
                next();
            } ;
        }).catch(error => {
            console.log(`Error logging in user: ${error.message}`);
            next(error);
        })
            
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