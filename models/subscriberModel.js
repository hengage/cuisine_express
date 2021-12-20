const mongoose = require('mongoose');

const newsletterSubscriberSchema = new mongoose.Schema({
    name: String,
    email: String
});

module.exports = mongoose.model(
    'Subscriber', newsletterSubscriberSchema
);

