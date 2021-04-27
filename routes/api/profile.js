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

            const result = await db.query("select * from follow where following_username = $1", [username]);
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

            const result = await db.query("select * from follow where this_username = $1", [username]);
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
    .post('/:username/edit', async function (req, res, next) {
        const username = req.params.username;
        const bio = req.body.bio;

        // Validate the coming package and validate the insert is successful
        if (bio.length > 0) {
            try {
                const result = await db.query("update user_account set bio = $2 where username = $1", [username, bio]);

                res.sendStatus(201);
            } catch (err) {
                console.error(err);
                res.status(404);
                res.send(err);
            }
        } else {
            const err_msg = 'Error: POST /post: invalid input.\n' + JSON.stringify({
                bio: bio
            });
            console.error(err_msg);
            res.status(400);
            res.send(err_msg);
        }

    })
    .post('/:username/follow', async function (req, res) {
        const this_username = req.params.username;
        const following_username = req.body.following_username;

        const data = {
            this_username: this_username,
            following_username: following_username
        }

        if (following_username.length > 0) {
            try {
                const result = await db.query("SELECT * from follow WHERE this_username = $1 AND following_username = $2;", [this_username, following_username]);
                const results = (result) ? result.rows : null;

                if (results && results.length === 0) {
                    await db.query("INSERT INTO follow VALUES ($1, $2);", [this_username, following_username]);
                }

                res.sendStatus(201)
            } catch (err) {
                console.error(err);
                res.status(404);
                res.send(err);
            }

        } else {
            const err_msg = 'Error: POST /post: invalid input.\n' + JSON.stringify(data);
            console.error(err_msg);
            res.status(400);
            res.send(err_msg);
        }
    })

module.exports = router;
