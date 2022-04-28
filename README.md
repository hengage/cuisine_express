# Cuisine Express
A web application ro find restaurants, make reservations and track all reservations made.

[https://cuisine-express.herokuapp.com/](https://cuisine-express.herokuapp.com/)

## Features
- Authenticationn for 2 different kind of users.
- Passport.js authentication
- Email notification.
- Create table reservation.

## To use project

Fork and clone repo, install all dependencies. Nodemon is used for automatic restart of app after a save.

I also used sentry for error monitoring and logging. Create an account on their website 
[https://sentry.io/welcome/](https://sentry.io/welcome/) and follow instructions. 


Passport JS is used for user authentication. I created 2 strategies for the User and Restaurant models.
That way, there are different authentications for user of both account types.

## Styling
I used SASS for the styling. The SASS files are structured in more dscrisptive, better organized way. 
Easier for development. There is a 'app.scss' file  whcih serves as the main scss file. 

ejs is the template engine used. 
