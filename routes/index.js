const router = require('express').Router(),
    homeRoutes = require('./homeRoutes'),
    userRoutes = require('./userRoutes'),
    courseRoutes = require('./courseRoutes'),
    errorRoutes = require('./errorRoutes');

router.use('/', homeRoutes)
.use('/users', userRoutes)
.use('/courses', courseRoutes)
.use('/', errorRoutes);


module.exports = router;


