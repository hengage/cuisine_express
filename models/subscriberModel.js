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

newsletterSubscriberSchema.methods.getInfo = () => {
    `Name: ${this.name} | Email ${this.email} `
}

newsletterSubscriberSchema.methods.findLocalSubscribers = () => {
    this.model('Subscriber')
}


module.exports = mongoose.model(
    'Subscriber', newsletterSubscriberSchema
);

