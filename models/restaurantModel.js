// let Country = require('country-state-city').Country;
// let State = require('country-state-city').State;

// console.log(Country.getAllCountries())
// console.log(State.getAllStates())

const mongoose = require('mongoose'),
    restaurantSchema = new mongoose.Schema({
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
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        zipCode : {
            type: Number,
            min: [10000, "Zip code too short"],
            max: 99999,
            required: true
        },
    });

    module.exports = mongoose.model(
        'Restaurant', restaurantSchema
    );