"use strict";

const randomstring = require("randomstring");

const mongoose = require('mongoose'),
    { Schema } = mongoose,

    reservationSchema = new Schema({
        code: {
            type: String,
            default: randomstring.generate({
                length: 12,
                charset: 'alphanumeric',
                unique: true
            })
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


module.exports = mongoose.model(
    'Reservation',
    reservationSchema
)