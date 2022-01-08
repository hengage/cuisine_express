const express = require('express'),
    app = express(),
    router = express.Router(),
    methodOverride = require('method-override'),
    expressMongoDb = require('express-mongo-db');

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

const layouts = require('express-ejs-layouts');

// Method Override
// router.use(methodOverride('_method', {
//     methods: ["POST", "GET"]
// }));

// app.use(methodOverride('X-HTTP-Method-Override'))

app.use(methodOverride('_method', {
    methods: ["POST", "GET"]
}));

// Require Controllers
const homeController = require("./controllers/homeController");
const usersController = require('./controllers/usersController');
    errorController = require("./controllers/errorController"),
    subscribersController = require('./controllers/subscribersController');



app.set("port", process.env.PORT || 3000);

// VIEW SETUP
app.set('view engine', 'ejs')
.use(layouts);

// STATIC FILES
app.use('/public', express.static('public'));

//Router 
app.use('/', router);

// BODY PARSING
app.use(express.urlencoded({extended:false}))
.use(express.json());

// ROUTES
router.get('/', homeController.homePageController);

router.get('/courses', homeController.showCourseList)

router.get('/subscribers', subscribersController.getAllSubscribers);

router.get('/subscribe', subscribersController.getSubscriptionPage);
app.post('/thanks', subscribersController.saveSubscribers);

router.get('/users', usersController.index, usersController.indexView);

router.get('/users/signup', usersController.newUser);
app.post('/users/create', usersController.create, usersController.redirectView);

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