const post = require('./post')

module.exports = app => {
    app.use('/api/post', post)
    return app;
}
