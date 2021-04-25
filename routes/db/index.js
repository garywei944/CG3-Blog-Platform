// Set up db loop up page rendering routes

const db = require('./db')

module.exports = app => {
    app.use('/db', db);
};
