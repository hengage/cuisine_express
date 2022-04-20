"use strict";


function toggleClass(x) {

    let nav = document.querySelector('nav');

    nav.classList.toggle('nav-menu');

    x.classList.toggle("change");
}