const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const db = require('./db');
const mountRoutes = require('./routes');

const app = express();

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.urlencoded({extended: true}))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

// Mount routes in ./routes/index.js
mountRoutes(app);

app
    // /db is a debugging view into the complete order_table database table
    .get('/db', async (req, res) => {
        let result;
        let results;
        try {
            result = await db.query("SELECT * FROM pg_tables WHERE tablename NOT LIKE 'pg%' AND tablename NOT LIKE 'sql_%'");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/user_account', async (req, res) => {
        let result;
        let results;
        try {
            result = await db.query("SELECT * FROM user_account");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/post', async (req, res) => {
        let result;
        let results;
        try {
            result = await db.query("SELECT * FROM post");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/liked', async (req, res) => {
        let result;
        let results;
        try {
            result = await db.query("SELECT * FROM liked");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })
    .get('/follow', async (req, res) => {
        let result;
        let results;
        try {
            result = await db.query("SELECT * FROM follow");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    //Page rendering
    .get('/login', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/loginpage.html'));
    })
    .get('/sign', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/signup.html'));
    })
    .get('/register', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/signup.html'));
    })
    .get('/blog', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/blogpage.html'));
    })
    .get('/post', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/post.html'));
    })
    .get('/profile', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/profile.html'));
    })
    .get('/home', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    })
    .get('/index', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    })


    //check login
    .post('/api/login', async (req, res) => {
        console.log('login start');
        let email = req.body.email;
        let psw = req.body.psw;
        let c_psw;
        result = await db.query("SELECT * FROM user_account WHERE username = $1", [email]);
        console.log("result:", JSON.stringify(result.rows));
        c_psw = result.rows[0].pwd;
        console.log(`check ${email} : if ${psw} = ${c_psw}`);
        if (psw === c_psw) {
            console.log(1);
            res.json(true);
        } else {
            console.log(2);
            res.json(false);
        }
        console.log('login end');
    })
    //check register
    .post('/api/register', async (req, res) => {
        console.log('register start');
        let email = req.body.email;
        let psw = req.body.psw;
        console.log(`register: ${email} ${psw}`);
        result = await db.query("INSERT INTO user_account VALUES ($1, $2, $3, $4);", [email, psw, "images/akari.jpg", "I'm a new user."]);
        res.json('Done');
        console.log('register end');
    })


    //Retrieving data from database and show it in the homepage html
    .get('/homepage', async (req, res) => {
        try {
            const result = await db.query('SELECT title FROM post');
            const results = {'results': (result) ? result.rows : null};
            res.json(results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    //Retrieving Blog Content from database and show it in the blogpage html
    .get('/blog/:post_id', async (req, res) => {
        try {
            const cond = `SELECT content FROM post WHERE post_id = ${req.params.post_id}`
            const result = await db.query(cond);
            const results = {'results': (result) ? result.rows : null};
            res.json(results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })


    .get('/gavin', (req, res) => res.render('pages/gavin'))

    .listen(PORT, () => console.log(`Listening on ${PORT}`));
