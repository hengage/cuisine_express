const express = require('express'),
    app = express(),
    router = express.Router(),
    layouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    expressMongoDb = require('express-mongo-db'),
    { check, validationResult} = require("express-validator");


// router.use(expressValidator());

// Sessions and flash messages
const expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    connectFlash = require('connect-flash');
 
router.use(cookieParser('secret_passcode'));
router.use(expressSession({
    secret: 'secret_passcode',
    cookie: {maxAge:50000},
    resave: false,
    saveUninitialized: false
}));
router.use(connectFlash());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});


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

// const config = require('./config')
// app.use(expressMongoDb(config))


process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
});


// Forms method Override
router.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));


app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));


// Require Controllers
const homeController = require("./controllers/homeController"),
    usersController = require('./controllers/usersController'),
    errorController = require("./controllers/errorController"),
    subscribersController = require('./controllers/subscribersController');



app.set("port", process.env.PORT || 3000);

// VIEW SETUP
app.set('view engine', 'ejs')
.use(layouts);

// STATIC FILES
app.use('/public', express.static('public'));

// Use router 
app.use('/', router);

// BODY PARSING
app.use(express.urlencoded({extended:false}))
.use(express.json());

// Forms validation.
// router.use(expressValidator());


// ROUTES
router.get('/', homeController.homePageController);

router.get('/courses', homeController.showCourseList)

router.get('/subscribers', subscribersController.getAllSubscribers);

router.get('/subscribe', subscribersController.getSubscriptionPage);
app.post('/thanks', subscribersController.saveSubscribers);

router.get('/users', usersController.index, usersController.indexView);

router.get('/users/signup', usersController.newUser);
app.post(
    '/users/create', 
    usersController.validateNewUser,
    usersController.create,
    usersController.redirectView
);

router.get('/users/login', usersController.login);
app.post(
    '/users/login', 
    usersController.authenticate, 
    usersController.redirectView
);

router.get(
    '/users/:id', 
    usersController.userProfile, 
    usersController.userProfileView
);

router.get('/users/:id/edit', usersController.editUserProfile);
app.put(
    '/users/:id/update', 
    usersController.updateUserProfile, 
    usersController.redirectView
);

router.delete(
    '/users/:id/delete', 
    usersController.deleteUSer, 
    usersController.redirectView
);


// ERROR HANDLING
app.use(errorController.pageNotFoundError)
.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(
        `Server running at ${app.get("port")}`
    );
})