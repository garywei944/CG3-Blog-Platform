const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

router
    .get('/:username/posts', async function (req, res) {
        try {
            const username = req.params.username;

            const result = await db.query("select * from post where username = $1", [username]);
            const results = (result) ? result.rows : null;

            res.json(results)
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/:username/follower', async function (req, res) {
        try {
            const username = req.params.username;

            const result = await db.query("select * from follow where username = $1", [username]);
            const results = (result) ? result.rows : null;

            res.json(results)
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/:username/following', async function (req, res) {
        try {
            const username = req.params.username;

            const result = await db.query("select * from follow where follower_name = $1", [username]);
            const results = (result) ? result.rows : null;

            res.json(results)
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    // Get a list of posts the user liked
    // return: [{ post_id, title }]
    .get('/:username/liked', async function (req, res) {
        try {
            const username = req.params.username;

            const ids_result = await db.query("select * from liked where username = $1", [username]);
            const ids = (ids_result) ? ids_result.rows : null;

            if (ids.length === 0) {
                res.json([]);
                return;
            }

            let query_text = ids.map(e => e.post_id).toString();

            const posts_result = await db.query("select * from post where post_id in (" + query_text + ")", []);
            const posts = (posts_result) ? posts_result.rows : null;

            res.json(posts.map(e => {
                return {
                    post_id: e.post_id,
                    title: e.title
                }
            }))
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

module.exports = router;
