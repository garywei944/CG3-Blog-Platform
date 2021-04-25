const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

const query_text = "insert into post (username, title, content, post_time) values ($1, $2, $3, $4)";



module.exports = router;
