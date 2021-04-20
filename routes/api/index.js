// Set up api routes

const homepage = require('./homepage');
const login = require('./login');
const post = require('./post');

module.exports = app => {
    app
        .use('/api', homepage)
        .use('/api', login)
        .use('/api', post)
};
