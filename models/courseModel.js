"use strict";

const mongoose = require('mongoose');

const courseSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        min: [0, "Course price cannot be negative"]
    },
    timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);