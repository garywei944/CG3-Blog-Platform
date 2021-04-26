const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

// TODO: handle the two requests and insert them into database
router
    // click on "like" - add 'this' user and 'this blog' to the sql table 'liked'
    .post('/blogpage_backened', async (req, res) => {
        console.log('here');
        let user_id = req.body.user_id;
        let post_id = req.body.post_id;
        let result = await db.query("INSERT INTO liked VALUES ($1, $2);", [user_id, post_id]);
        
        console.log("result:", JSON.stringify(result.rows));
    })
    // click on "follow" - add 'this' user and 'this blogger' to the sql table 'follow'
    .post('/blogpage_backened', async (req, res) => {
        console.log('here');
        let this_user_id = req.body.this_user_id;
        let poster_user_id = req.body.poster_user_id;
        let result = await db.query("INSERT INTO follow VALUES ($1, $2);", [this_user_id, poster_user_id]);
        
        console.log("result:", JSON.stringify(result.rows));
    })



module.exports = router;
