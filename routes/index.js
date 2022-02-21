const router = require('express').Router(),
    homeRoutes = require('./homeRoutes'),
    userRoutes = require('./userRoutes'),
    restaurantRoutes = require('./restaurantRoutes'),
    courseRoutes = require('./courseRoutes'),
    errorRoutes = require('./errorRoutes');

router.use('/', homeRoutes)
.use('/users', userRoutes)
.use('/restaurant', restaurantRoutes)
.use('/courses', courseRoutes)
.use('/', errorRoutes);


module.exports = router;


