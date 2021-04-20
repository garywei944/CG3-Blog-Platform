// Set up db loop up page rendering routes

const db = require('../../db')

module.exports = app => {
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
        .get('/db/user_account', async (req, res) => {
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
        .get('/db/post', async (req, res) => {
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

        //Retrieving Blog Content from database and show it in the blogpage html
        .get('/db/post/:post_id', async (req, res) => {
            try {
                const cond = "SELECT content FROM post WHERE post_id = '${req.params.post_id}'"
                const result = await db.query(cond);
                const results = {'results': (result) ? result.rows : null};
                res.json(results);
            } catch (err) {
                console.error(err);
                res.send("Error " + err);
            }
        })
        .get('/db/liked', async (req, res) => {
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
        .get('/db/follow', async (req, res) => {
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
};
