// noinspection ExceptionCaughtLocallyJS

const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

// Router for all routes

router
    //Page rendering
    .get('/', function (req, res) {
        res.render('pages/index', {});
    })
    .get('/login', function (req, res) {
        res.render('pages/loginpage', {});
    })
    .get('/signup', function (req, res) {
        res.render('pages/signup', {});
    })
    .get('/post', function (req, res) {
        res.render('pages/post', {});
    })
    //Retrieving Blog Content from database and show it in the blogpage html
    .get('/post/:post_id', async (req, res) => {
        try {
            const cond = "SELECT * FROM post WHERE post_id='" + req.params.post_id + "';";
            const result = await db.query(cond);
            const results = (result) ? result.rows : null;
            console.log(results);
            res.render("pages/blogpage", results[0]);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/:username', async function (req, res) {
        const username = req.params.username

        try {
            let result = await db.query("select * from user_account where username = $1", [username]);
            const user_data = result ? result.rows[0] : null;

            // throw error if the database return 0 results
            if (!user_data) throw new Error('No user profile with username - ' + username);

            const data = {
                username: username,
                img_url: 'images/akari.jpg',
                bio: user_data.bio,
            };

            res.render("pages/profile", data);
        } catch (err) {
            console.error(err);
            res.status(404);
            res.send("Error " + err);
        }
    })


module.exports = router;
