"use strict";

const mongoose =  require('mongoose'),
    { Schema } = mongoose,

    userschema = new Schema({
        name: {
            first: {
                type: String, 
                trim: true
            },
            last: {
                type: String,
                trim: true
            }
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
        courses: [{type: Schema.Types.ObjectId, ref: "Course"}],
        subscribedAccount: {type: Schema.Types.ObjectId, ref: "Subscriber"}
        }, {
        timestamps: true
    });

userschema.virtual('fullName')
    .get(function() {
        return `${this.name.first} ${this.name.last}`
    });

module.exports = mongoose.model('User', userschema);
