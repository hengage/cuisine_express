redirectView = (req, res, next) => {
    // Function for redirection to another page 
    // after a successful crud operation

    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
}

module.exports = redirectView