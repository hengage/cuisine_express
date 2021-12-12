const express = require('express'),
    app = express();

const layouts = require('express-ejs-layouts');

// Require Controllers
const homeController = require("./controllers/homeController")
    errorController = require("./controllers/errorController");

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

app.post('/thanks', homeController.postedSignUpForm);


// ERROR HANDLING
app.use(errorController.pageNotFoundError)
.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(
        `Server running at ${app.get("port")}`
    );
})