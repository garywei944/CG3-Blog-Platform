const post = require('./post')

module.exports = app => {
    app.use('/api', post)
}
