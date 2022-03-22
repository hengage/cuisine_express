const Reservation = require('../models/reservationModel');
const User = require('../models/userModel')

const  getReservationParams = (body) => {
    return {
        code: body.code,
    }
        
};

const makeReservation =  (req, res, next) => {
    if (req.skip) next();

    User.findOne({email})
        .then(user => {
            let newReservation = new Reservation();

            Reservation.register(newReservation, (error, reservation) => {
                if (reservation) {
                    req.flash("success", `Your reservation has been made`);
                    // res.locals.redirect = '/users';
                    next();
                }   else {
                    req.flash("error", `Failed to create user account because: ${error.message}.`);
                    // res.locals.redirect = 'users/signup';
                    next()
                }
            })
        })

    
}

module.exports = makeReservation