// Set up api routes

const db = require('../../db');
const post = require('./post');

module.exports = app => {
    app
        .use('/api', post)

        //Retrieving data from database and show it in the homepage html
        .get('/api/homepage', async (req, res) => {
            try {
                const result = await db.query('SELECT title FROM post');
                const results = {'results': (result) ? result.rows : null};
                res.json(results);
            } catch (err) {
                console.error(err);
                res.send("Error " + err);
            }
        })

        //check login
        .post('/api/login', async (req, res) => {
            console.log('login start');
            let email = req.body.email;
            let psw = req.body.psw;
            let c_psw;
            let result = await db.query("SELECT * FROM user_account WHERE username = $1", [email]);
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
            let result = await db.query("INSERT INTO user_account VALUES ($1, $2, $3, $4);", [email, psw, "images/akari.jpg", "I'm a new user."]);
            res.json('Done');
            console.log('register end');
        })
};
