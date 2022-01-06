"use strict";

const mongoose = require('mongoose');

const courseSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: string,
        required: true
    },
    items: []
});

module.exports = mongoose.model('Course', courseSchema);