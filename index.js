const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const {Pool} = require('pg');
const pool = new Pool({
    connectionString: 'postgres://juniukfpehmdne:236f3ffe26068d48891647c5f929636d231836c7806fa93371364b346605415f@ec2-34-225-167-77.compute-1.amazonaws.com:5432/de9lhvo95dcacl',
    ssl: {
        rejectUnauthorized: false
    }
});

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.urlencoded({extended: true}))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/test', (req, res) => res.render('pages/test', {users: ["John", "Paul", "Ringo"]}))
    .get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    })
    // /db is a debugging view into the complete order_table database table
    .get('/db', async (req, res) => {
        let client;
        let result;
        let results;
        try {
            client = await pool.connect();
            result = await client.query("SELECT * FROM pg_tables WHERE tablename NOT LIKE 'pg%' AND tablename NOT LIKE 'sql_%'");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    .get('/user_account', async (req, res) => {
        let client;
        let result;
        let results;
        try {
            client = await pool.connect();
            result = await client.query("SELECT * FROM user_account");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    .get('/post', async (req, res) => {
        let client;
        let result;
        let results;
        try {
            client = await pool.connect();
            result = await client.query("SELECT * FROM post");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    .get('/liked', async (req, res) => {
        let client;
        let result;
        let results;
        try {
            client = await pool.connect();
            result = await client.query("SELECT * FROM liked");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    .get('/follow', async (req, res) => {
        let client;
        let result;
        let results;
        try {
            client = await pool.connect();
            result = await client.query("SELECT * FROM follow");
            results = {};
            results.results = (result) ? result.rows : null;
            res.render('pages/db', results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    //Retrieving data from database and show it in the homepage html
    .get('/homepage', async (req, res) => {
        try {
            const client = await pool.connect();

            const result = await client.query('SELECT title FROM post');
            const results = {'results': (result) ? result.rows : null};
            res.json(results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

    //Retrieving Blog Content from database and show it in the blogpage html
    .get('/blog/:post_id', async (req, res) => {
        try {
            const client = await pool.connect();

            const cond = `SELECT content FROM post WHERE post_id = ${req.params.post_id}`
            const result = await client.query(cond);
            const results = {'results': (result) ? result.rows : null};
            res.json(results);
            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })


    .get('/gavin', (req, res) => res.render('pages/gavin'))

    .listen(PORT, () => console.log(`Listening on ${PORT}`))
