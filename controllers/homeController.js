"use strict";

const courses = [
    {
        title: "skin care smoothies",
        cost: 50
    },
    {
        title: "white soup",
        cost: 100
    },
    {
        title: "afang soup",
        cost: 100
    },
]

exports.homePageController = (req, res) => {
    res.render('home');
};


exports.showCourseList = (req, res) => {
    res.render('courses', {
        coursesOffered: courses
    });
};

exports.postedSignUpForm = (req, res) => {
    res.render('thanks');
};