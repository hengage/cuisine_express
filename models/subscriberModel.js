const mongoose = require('mongoose');

const newsletterSubscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    } 
});

module.exports = mongoose.model(
    'Subscriber', newsletterSubscriberSchema
);

