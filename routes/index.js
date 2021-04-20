// Set up static webpage routes

const path = require('path');

const db = require('../db');
const mountAPI = require('./api');
const mountDB = require('./db');

module.exports = app => {
    app
        //Page rendering
        .get('/login', function (req, res) {
            res.sendFile(path.join(__dirname + '/../public/loginpage.html'));
        })
        .get('/signup', function (req, res) {
            res.sendFile(path.join(__dirname + '/../public/signup.html'));
        })

    // Mount all db's and api's
    mountDB(app)
    mountAPI(app);
}
