// Set up api routes

const homepage = require('./homepage');
const blogpage = require('./blogpage_backend')
const login = require('./login');
const post = require('./post');


module.exports = app => {
    app
        .use('/api', homepage)
        .use('/api', blogpage)
        .use('/api', login)
        .use('/api', post)
};
