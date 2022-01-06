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
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }] 
});

newsletterSubscriberSchema.methods.getInfo = function() {
    return `Name: ${this.name} | Email ${this.email} `
}

newsletterSubscriberSchema.methods.findLocalSubscribers = function(){
    return this.model('Subscriber')
}


module.exports = mongoose.model(
    'Subscriber', newsletterSubscriberSchema
);

