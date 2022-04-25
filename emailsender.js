const nodemailer = require('nodemailer');

const makeReservationConfirmEmail = (currentUser, date) => {
    
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
        subject: "Nodejs email ",
        html: `<h2>Your table Reservation has been made successfully</h2>
        Date is: ${date}`
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