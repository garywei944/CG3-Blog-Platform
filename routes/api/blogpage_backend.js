const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

// TODO: handle the two requests and insert them into database
router
    // click on "like" - add 'this' user and 'this blog' to the sql table 'liked'
    .post('/blogpage_backened_like', async (req, res) => {
        let user_id = req.body.user_id;
        let post_id = req.body.post_id;

        // only insert into database if there is no existing record
        let query = await db.query("SELECT * from liked WHERE username = $1 AND post_id = $2;", [user_id, post_id]);
        const results = (query) ? query.rows : null;

        if (!results[0]){
            let sql_insert = await db.query("INSERT INTO liked VALUES ($1, $2);", [user_id, post_id]);
            console.log(user_id + " liked post " + post_id)
            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
       
    })
    // click on "follow" - add 'this' user and 'this blogger' to the sql table 'follow'
    .post('/blogpage_backened_follow', async (req, res) => {
        let this_user_id = req.body.this_user_id;
        let post_id = req.body.post_id;
        // get poster username
        const result = await db.query("select username from post where post_id = $1", [post_id]);
        let poster_user_id = (result) ? result.rows : null; // [ { username: 'test4@test' } ]
        poster_user_id = poster_user_id[0].username; // 'test4@test'

        // only insert into database if there is no existing record
        let query = await db.query("SELECT * from follow WHERE this_username = $1 AND following_username = $2;", [this_user_id, poster_user_id]);
        const results = (query) ? query.rows : null;

        if (!results[0]){
            let sql_insert = await db.query("INSERT INTO follow VALUES ($1, $2);", [this_user_id, poster_user_id]);
            console.log(this_user_id + " followed user " + poster_user_id)
            res.sendStatus(201);
        } else {
            res.sendStatus(400);
        }
        
    })

    .get('/blogpage_poster', async (req, res) => {
        console.log(req)
        const post_id = req.params.post_id;
        const result = await db.query("select username from post where post_id = $1", [post_id]);
        const results = (result) ? result.rows : null;

        res.json(results);
    });


module.exports = router;
