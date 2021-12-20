const mongoose = require('mongoose');

const config = () => {
    let dbURL = 'mongodb://localhost:27017/cuisine_db'
    mongoose.connect(dbURL, {
        useNewURLParser: true
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once('open', () => {
        console.log('Succesfully connected to mongodb using mongoose');
    })

    // process.on('SIGINT', function() {
//     mongoose.connection.close(function () {
//       console.log('Mongoose disconnected on app termination');
//       process.exit(0);
//     });
// });
}

module.exports = config;
