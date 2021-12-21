const express = require('express'),
    app = express();

// DATABASE CONNECTION
const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

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

app.get('/subscribers', subscribersController.getAllSubscribers);

app.get('/subscribe', subscribersController.getSubscriptionPage);

app.post('/thanks', subscribersController.saveSubscribers);





// ERROR HANDLING
app.use(errorController.pageNotFoundError)
.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(
        `Server running at ${app.get("port")}`
    );
})