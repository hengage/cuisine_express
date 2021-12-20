const Subscriber = require('../models/subscriberModel');

exports.getAllSubscribers = (req, res, next) => {
    Subscriber.find({}, (error, subscribers) => {
        if (error) next(error);
        req.data = subscribers;
        res.render('subscribers', {subscribers: req.data});
        next();
    });
};
