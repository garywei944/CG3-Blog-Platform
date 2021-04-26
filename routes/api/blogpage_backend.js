const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

// TODO: handle the two requests and insert them into database
router
    // click on "like" - add 'this' user and 'this blog' to the sql table 'liked'
    .post('/blogpage_backened_like', async (req, res) => {
        let user_id = req.body.user_id;
        let post_id = req.body.post_id;
        let result = await db.query("INSERT INTO liked VALUES ($1, $2);", [user_id, post_id]);
        
        console.log(user_id + " liked " + post_id)
    })
    // click on "follow" - add 'this' user and 'this blogger' to the sql table 'follow'
    .post('/blogpage_backened_follow', async (req, res) => {
        let this_user_id = req.body.this_user_id;
        let poster_user_id = req.body.poster_user_id;
        let result = await db.query("INSERT INTO follow VALUES ($1, $2);", [this_user_id, poster_user_id]);
        
        console.log(this_user_id + " followed " + poster_user_id)
    })



module.exports = router;
