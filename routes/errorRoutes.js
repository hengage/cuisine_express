const router = require('express').Router(),
    errorController = require("../controllers/errorController");


router.use(errorController.pageNotFoundError)
.use(errorController.internalServerError);


module.exports = router;