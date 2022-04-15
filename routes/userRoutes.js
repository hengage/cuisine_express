const express = require('express'),
    router = express.Router(),
    usersController = require('../controllers/usersController'),
    redirectView = require('../controllers/utils');;


router.get(
    '/', usersController.index, 
    usersController.indexView
);

router.get(
    '/signup', 
    usersController.newUser
);
router.post(
    '/create',
    usersController.validateNewUser,
    usersController.create,
    redirectView
);

router.get('/login', usersController.login);

router.post(
    '/login',
    usersController.authenticate,
    usersController.userLoginRedirect,
    // redirectView,
);

router.get(
    '/logout', 
    usersController.logout, 
    redirectView
)

router.get(
    '/:id',
    usersController.userProfile,
    usersController.usersReservation,
    usersController.userProfileView
);

router.get(
    '/:id/edit',
    usersController.editUserProfile
);
router.put(
    '/:id/update',
    usersController.updateUserProfile,
    redirectView
);

router.delete(
    '/:id/delete',
    usersController.deleteUSer,
    redirectView
);

module.exports = router;

