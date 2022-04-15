"use strict";

const randomstring = require("randomstring");


const mongoose = require('mongoose'),
    { Schema } = mongoose,

    reservationSchema = new Schema({
        code: {
            type: String,
            unique: true
        },

        reservationDateTime: {
            type: Date,
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    }, {
        timestamps: true
    });


    reservationSchema.pre('save', function(next) {
        this.code = randomstring.generate({
            length: 7,
            charset: 'alphanumeric',
            capitalization: 'lowercase'
        }) ;
        next();
    })

module.exports = mongoose.model(
    'Reservation',
    reservationSchema
)