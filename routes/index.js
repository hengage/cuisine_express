const router = require('express').Router(),
    homeRoutes = require('./homeRoutes'),
    authRoutes = require('./authRoutes'),
    userRoutes = require('./userRoutes'),
    restaurantRoutes = require('./restaurantRoutes'),
    reservationRoutes= require('./reservationRoutes'),
    courseRoutes = require('./courseRoutes'),
    errorRoutes = require('./errorRoutes');

router.use('/', homeRoutes)
.use('/', authRoutes)
.use('/users', userRoutes)
.use('/restaurant', restaurantRoutes)
.use('/reservation', reservationRoutes )
.use('/courses', courseRoutes)
.use('/', errorRoutes);

// router.get('/register', (req, res) => {
//     // res.render('/register')
//     res.send('Register')
// })


module.exports = router;


