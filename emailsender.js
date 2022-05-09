const nodemailer = require('nodemailer');

const makeReservationConfirmEmail = (currentUser, restaurant, date) => {
    
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD
        }
    });

    const message = {
        from: "Cuisine Express <noreply@cuisine_express.com>",
        to: currentUser.email,
        subject: "Table Reservation ",
        html: `<div style="text-align: center;">
        <h2>Your table reservation booking was successful</h2>
        <p>You are getting this email because you booked a table at ${restaurant}.</p>

        <p>Reservation Time: ${date}</p>

        <p>Please endeavour to be present for your dining.</p>
        </div>`
    }

    transporter.sendMail(message, function(err, info) {
        if (err) {
        console.log(err)
        } else {
        console.log(info);
        }
    })
}


module.exports = makeReservationConfirmEmail