const express = require('express'),
    router  = express.Router(),
    restaurantController = require('../controllers/restaurantController');


router.get('/register', restaurantController.newRestaurant );

router.post('/create-business', restaurantController.create, restaurantController.redirectView)

router.get('/login', restaurantController.login)
.post('/login', restaurantController.authenticate, restaurantController.redirectView)

// router.get('/dashboard/:id', restaurantController.dashboardView, restaurantController.dashboard);
router.get('/dashboard/:name', restaurantController.dashboard, restaurantController.dashboardView,);



module.exports = router