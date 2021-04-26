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

module.exports = router;
