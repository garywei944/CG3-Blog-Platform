// Set up static webpage routes

const routes = require('./routes');

const mountAPI = require('./api');
const mountDB = require('./db');

module.exports = app => {
    app.use('/', routes)

    // Mount all db's and api's
    mountDB(app)
    mountAPI(app);

}
