const express = require('express'),
    app = express();

// DATABASE CONNECTION
const mongoose = require('mongoose');

let dbURL = 'mongodb://localhost:27017/cuisine_db'
mongoose.connect(dbURL, {
    useNewURLParser: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log('Succesfully connected to mongodb using mongoose');
})

const config = require('./config')

// REQUIRE MODELS
const Subscriber = require('./models/subscriberModel');

// INSTANTIATE NEW USER DOCUMENTS
// const subscriber1 = new Subscriber({
//     name: 'hengage',
//     email: "henry@chi.com",
// });

// subscriber1.save((error, savedDocument) => {
//     if (error) { 
//         return handleError(error) 
//         console.log(error);
//     };
//     console.log(savedDocument)
// });

// Subscriber.create(
//     {
//         name: 'chizoba',
//         email: 'lace@lace.com'
//     }, (error, savedDocument) => {
//         if (error) console.log(error);
//         console.log(savedDocument);
//     }
// );

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
});

const layouts = require('express-ejs-layouts');

// Require Controllers
const homeController = require("./controllers/homeController")
    errorController = require("./controllers/errorController"),
    subscribersController = require('./controllers/subscribersController');

app.set("port", process.env.PORT || 3000);

// VIEW SETUP
app.set('view engine', 'ejs')
.use(layouts);

// STATIC FILES
app.use('/public', express.static('public'));


// BODY PARSING
app.use(express.urlencoded({extended:false}))
.use(express.json())

// ROUTES
app.get('/', homeController.homePageController);

app.get('/courses', homeController.showCourseList)

app.get('/contact', homeController.showSignUp);


app.get('/subscribers', subscribersController.getAllSubscribers);

app.post('/thanks', homeController.postedSignUpForm);



// ERROR HANDLING
app.use(errorController.pageNotFoundError)
.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(
        `Server running at ${app.get("port")}`
    );
})