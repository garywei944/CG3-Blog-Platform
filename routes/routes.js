// noinspection ExceptionCaughtLocallyJS

const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

// Router for all routes

router
    //Page rendering
    .get('/login', function (req, res) {
        res.sendFile(appRoot + '/public/loginpage.html');
    })
    .get('/signup', function (req, res) {
        res.sendFile(appRoot + '/public/signup.html');
    })
    .get('/post', function (req, res) {
        res.render('pages/post', {});
    })
    .get('/:username', async function (req, res) {
        const username = req.params.username

        try {
            let result = await db.query("select * from user_account where username = $1", [username]);
            const user_data = result ? result.rows[0] : null;

            // throw error if the database return 0 results
            if (!user_data) throw new Error('No user profile with username - ' + username);

            result = await db.query("select * from post where username = $1", [username]);
            const posts = result ? result.rows : null;

            const data = {
                username: username,
                img_url: 'images/akari.jpg',
                bio: user_data.bio,
                posts: posts
            };

            res.render("pages/profile", data);
        } catch (err) {
            console.error(err);
            res.status(404);
            res.send("Error " + err);
        }
    })


module.exports = router;
