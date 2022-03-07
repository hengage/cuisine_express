"use strict";

const express = require('express'),
    router = express.Router();

router.get('/register', (req, res) => {
    res.render('_register')
})


router.get('/login', (req, res) => {
    res.render('_login')
})


module.exports = router;