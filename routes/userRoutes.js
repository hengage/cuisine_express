const express = require('express'),
    router  = express.Router(),
    usersController = require('../controllers/usersController');

    
router.get('/', usersController.index, usersController.indexView);

router.get('/signup', usersController.newUser);
router.post(
    '/create', 
    usersController.validateNewUser,
    usersController.create,
    usersController.redirectView
);

router.get('/login', usersController.login);
router.post(
    '/login', 
    usersController.authenticate, 
    usersController.redirectView
);

router.get(
    '/:id', 
    usersController.userProfile, 
    usersController.userProfileView
);

router.get('/:id/edit', usersController.editUserProfile);
router.put(
    '/:id/update', 
    usersController.updateUserProfile, 
    usersController.redirectView
);

router.delete(
    '/:id/delete', 
    usersController.deleteUSer, 
    usersController.redirectView
);

module.exports = router;

// module.exports = app;