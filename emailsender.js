const nodemailer = require('nodemailer');

const makeReservationConfirmEmail = (currentUser, restaurant, date) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const message = {
        from: `Cuisine Express ${process.env.GMAIL_USER}`,
        to: currentUser.email,
        subject: "Table Reservation ",
        html: `
        <div style="text-align: center;">
            <h2>Your table reservation booking was successful</h2>
            <p>You are getting this email because you booked a table at ${restaurant}.</p>

            <p>Reservation Time: ${date}</p>

            <p>Please endeavour to be present for your dining.</p>

            <div style="margin-top: 2em;">
                <a href="https://cuisine-express.herokuapp.com/">cuisine-express.herokuapp.com</a>
            </div>
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