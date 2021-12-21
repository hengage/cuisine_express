const mongoose = require('mongoose'),
    Subscriber = require('./models/subscriberModel');


let dbURL = 'mongodb://localhost:27017/cuisine_db'
mongoose.connect(dbURL, {
    useNewURLParser: true
});
    
mongoose.connection; 

var contacts = [
    {
        name: "henry chizoba",
        email: "henry@chi.com.com",
    },
    {
        name: "amaka eze",
        email: "amaka@ezeh.com",
    },
        {
        name: "shirley love",
        email: "shirley@love.com",
    }
];

Subscriber.deleteMany()
    .exec()
    .then(() => {
        console.log('Deleted exisiting subscribers');
});

let commands = [];

contacts.forEach((contact) => {
    commands.push(Subscriber.create({
        name: contact.name,
        email: contact.email
    }));
});

Promise.all(commands)
    .then(res => {
        console.log(JSON.stringify(res));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log('Error', error);
    })