const Reservation = require('../models/reservationModel');
const User = require('../models/userModel')

const  getReservationParams = (body) => {
    return {
        code: body.code,
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

    // makeReservation: (req, res, next) => {
    //     if (req.skip) next();
    
    //     User.findOne({email})
    //         .then(user => {
    //             let newReservation = new Reservation();
    
    //             Reservation.register(newReservation, (error, reservation) => {
    //                 if (reservation) {
    //                     req.flash("success", `Your reservation has been made`);
    //                     // res.locals.redirect = '/users';
    //                     next();
    //                 }   else {
    //                     req.flash("error", `Failed to create user account because: ${error.message}.`);
    //                     // res.locals.redirect = 'users/signup';
    //                     next()
    //                 }
    //             })
    //         })
    // },

    makeReservation: (req, res, next) => {
        if (req.skip) next();
    
        User.findOne({email})
            .then(user => {
                let newReservation = new Reservation();
    
                newReservation.save(newReservation, (error, reservation) => {
                    if (reservation) {
                        req.flash("success", `Your reservation has been made`);
                        console.log("success", `Your reservation has been made`);
                        res.locals.redirect = '/';
                        next();
                    }   else {
                        req.flash("error", `'failed to create reservation: ${error.message}.`);
                        // res.locals.redirect = 'users/signup';
                        console.log('failed to create reservation')
                        next()
                    }
                })
            })
    },

}



