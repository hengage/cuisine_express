const nodemailer = require('nodemailer');
const ejs = require('ejs')

const makeReservationConfirmEmail = async (currentUser, restaurant, date) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const data = await ejs.renderFile(
        __dirname + '/views/email/makeReservationConfirmEmail.ejs',
        {
            date: date,
            restaurant: restaurant
        })

    const message = {
        from: `Cuisine Express ${process.env.GMAIL_USER}`,
        to: currentUser.email,
        subject: "Table Reservation ",
        html: data
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