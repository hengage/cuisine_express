const express = require('express'),
    app = express(),
    expressRouter = express.Router(),
    layouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    expressMongoDb = require('express-mongo-db'),
    { check, validationResult} = require("express-validator");


require('dotenv').config();

// Sessions and flash messages
const expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    connectFlash = require('connect-flash');

const Sentry = require("@sentry/node");

// Importing @sentry/tracing patches the global hub for tracing to work.
const Tracing = require("@sentry/tracing");

Sentry.init({
    dsn: "https://fcd981ce1ca547c08bb50a9bb2bd8de0@o1061170.ingest.sentry.io/6084900",

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

expressRouter.use(cookieParser('secret_passcode'));
expressRouter.use(expressSession({
    secret: 'secret_passcode',
    cookie: {maxAge:5500000000},
    resave: false,
    saveUninitialized: false
}));
expressRouter.use(connectFlash());

expressRouter.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});


const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

expressRouter.use(passport.initialize())
.use(passport.session());

const User = require('./models/userModel'),
    Restaurant = require('./models/restaurantModel');
;
passport.use('restaurantLocal',Restaurant.createStrategy())
passport.use('userLocal',User.createStrategy())

// passport.use('userLocal', new LocalStrategy(User.authenticate()));
// passport.use('restaurantLocal', new LocalStrategy(Restaurant.authenticate()));

// passport.use('userLocal', new LocalStrategy(
//     function(email, password, done) {
//         User.findOne({ email: email}, function (err, user) {
//             if(err) throw err;
//             if(!user){
//               return done(null, false, {
//                   message: `No user found`
//                 });
//             };
//         });
//     }
// ));


// passport.use('restaurantLocal', new LocalStrategy(
//     function(email, password, done) {
//         User.findOne({ email: email}, function (err, user) {
//             if(err) throw err;
//             if(!user){
//               return done(null, false, {message: 'No user found'});
//             };
//         });
//     }
// ));


function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}

passport.serializeUser(function (userObject, done) {
    // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    let userGroup = "model1";
    let userPrototype =  Object.getPrototypeOf(userObject);
  
    if (userPrototype === User.prototype) {
        userGroup = "model1";
    } else if (userPrototype === Restaurant.prototype) {
        userGroup = "model2";
    } 

    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);
});

passport.deserializeUser(function (sessionConstructor, done) {

    if (sessionConstructor.userGroup == 'model1') {
        User.findOne({
            _id: sessionConstructor.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
    } else if (sessionConstructor.userGroup == 'model2') {
        Restaurant.findOne({
            _id: sessionConstructor.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
    } 

});


expressRouter.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});


const router = require('./routes/index');


// router.use(expressValidator());


app.use('/', expressRouter);

// DATABASE CONNECTION
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

let dbURL = process.env.DATABASE_URL
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
expressRouter.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));


app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));



app.set("port", process.env.PORT);

// VIEW SETUP
app.set('view engine', 'ejs')
.use(layouts);

// STATIC FILES
app.use('/public', express.static('public'));


// BODY PARSING
app.use(express.urlencoded({extended:false}))
.use(express.json());


// Use router 
app.use('/', router);


// Forms validation.
// router.use(expressValidator());


app.listen(app.get("port"), () => {
    console.log(
        `Server running at ${app.get("port")}`
    );
})

