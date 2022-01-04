const Subscriber = require('../models/subscriberModel');


// exports.getAllSubscribers = (req, res, next) => {
//     Subscriber.find({}, (error, subscribers) => {
//         if (error) next(error);
//         req.data = subscribers;
//         res.render('subscribers', {subscribers: req.data});
//         // next();
//     });
// };

// Get all subcscribers
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
    .exec()
    .then((subscribers) => {
        res.render('subscribers', {
            subscribers: subscribers
        });
    })
    .catch((error) => {
      console.log(error.message);
      return [];  
    })
    .then(() => {
        console.log('Promise completed')
    });
};


exports.getSubscriptionPage = (req, res) => {
    // Renders the contact page for visitors to susbcribe to newsletter
    res.render('contact');
};

exports.saveSubscribers = (req, res) => {
    // Saves new subscribers to the database
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email
    });

    // newSubscriber.save((error, result) => {
    //     if (error) res.send(error);
    //     res.render('thanks');
    // });

    newSubscriber.save()
        .then(result => {
            res.render('thanks', {result: result});
            console.log(result)
            console.log('Details saved to database!');
        })
        .catch(error => {
            if (error) res.send(error);
        })
};