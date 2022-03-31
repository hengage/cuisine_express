"use strict";

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
        
        // let user = req.userId;
        const user = req.currentUser;
        User.findOne({user})
            .then(user => {
                // console.log('The user is:', user)
                const {code, restaurant} = req.body
                let newReservation = new Reservation({code, user, restaurant});
                // let newReservation = new Reservation({ user, });

                newReservation.save()
                .then((reservation) => {
                        req.flash("success", `Your reservation has been made`);
                        console.log("success", `Your reservation has been made`);
                        console.log('The new reservation is', reservation)

                        user.reservation.push(reservation)
                        user.save()
                        console.log('=========================== \n')
                        // console.log(reservation)
                        console.log('=========================== \n')
                        console.log(user.reservation)

                        const userById =  User.findById({_id: reservation.user});
                        // console.log(userById.name)
                        // userById.reservation.push(reservation);
                        // userById.save();

                        res.locals.redirect = '/reservation';
                        next();
                        
                }).catch((error)=> {
                    console.log('Reservation failed because:', error)
                    next(error)
                })
    
                // newReservation.save(newReservation, (error, reservation) => {
                //     if (reservation) {
                //         req.flash("success", `Your reservation has been made`);
                //         console.log("success", `Your reservation has been made`);
                //         res.locals.redirect = '/reservation';
                //         next();
                //     }   else {
                //         req.flash("error", `'failed to create reservation: ${error.message}.`);
                //         // res.locals.redirect = 'users/signup';
                //         console.log('failed to create reservation')
                //         next()
                //     }
                // })
            })
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



