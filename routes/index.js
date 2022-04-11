const router = require('express').Router(),
    homeRoutes = require('./homeRoutes'),
    authRoutes = require('./authRoutes'),
    userRoutes = require('./userRoutes'),
    restaurantRoutes = require('./restaurantRoutes'),
    errorRoutes = require('./errorRoutes');

router.use('/', homeRoutes)
.use('/', authRoutes)
.use('/users', userRoutes)
.use('/restaurant', restaurantRoutes)
.use('/', errorRoutes);



module.exports = router;


