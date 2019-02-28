const moment = require('moment');

// Dare.now() === moment()

// req, res are objects, next is a callback
const logger = (req, res, next) => {
    console.log(`${req.url} was requested at 
    ${moment()}`);
    next();
}

module.exports = logger;