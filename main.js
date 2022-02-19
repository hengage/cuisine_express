const express = require('express'),
    app = express(),
    expressRouter = express.Router(),
    layouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    expressMongoDb = require('express-mongo-db'),
    { check, validationResult} = require("express-validator");


require('dotenv').config();

// Sessions and flash messages
const expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    connectFlash = require('connect-flash');

expressRouter.use(cookieParser('secret_passcode'));
expressRouter.use(expressSession({
    secret: 'secret_passcode',
    cookie: {maxAge:50000},
    resave: false,
    saveUninitialized: false
}));
expressRouter.use(connectFlash());

expressRouter.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});


const passport = require('passport');

expressRouter.use(passport.initialize())
.use(passport.session());

const User = require('./models/userModel');
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const router = require('./routes/index');


// router.use(expressValidator());


app.use('/', expressRouter);

// DATABASE CONNECTION
const mongoose = require('mongoose');
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

