const showError = (res, errorCode) => {
    res.render('error',  {errorCode});
}

module.exports = showError