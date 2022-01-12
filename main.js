const express = require('express'),
    app = express(),
    expressRouter = express.Router(),
    layouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    expressMongoDb = require('express-mongo-db'),
    { check, validationResult} = require("express-validator");

const usersController = require('./controllers/usersController');
const router = require('./routes/index');


// router.use(expressValidator());

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



app.use('/', expressRouter);

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
expressRouter.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));


app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));



app.set("port", process.env.PORT || 3000);

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


// ROUTES


// router.get('/subscribers', subscribersController.getAllSubscribers);

// router.get('/subscribe', subscribersController.getSubscriptionPage);
// app.post('/thanks', subscribersController.saveSubscribers);






app.listen(app.get("port"), () => {
    console.log(
        `Server running at ${app.get("port")}`
    );
})

