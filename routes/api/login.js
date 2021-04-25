const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

router
    //check login
    .post('/login', async (req, res) => {
        console.log('login start');
        let username = req.body.username;
        let psw = req.body.psw;
        let c_psw;
        console.log(`login ${username} ${psw}`);
        let result = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        console.log("result:", JSON.stringify(result.rows));
        c_psw = result.rows[0].pwd;
        console.log(`check ${username} : if ${psw} = ${c_psw}`);
        if (psw === c_psw) {
            console.log(1);
            res.json(true);
        } else {
            console.log(2);
            res.json(false);
        }
        console.log('login end');
    })
    .post('/register', async (req, res) => { // should be '/signup' instead? -Genglin
        console.log('register start');
        let username = req.body.username;
        let email = req.body.email;
        let psw = req.body.psw;
        console.log(`register: ${username} ${email} ${psw}`);
        let result = await db.query("INSERT INTO user_account VALUES ($1, $2, $3, $4, $5);", [username, psw, "images/akari.jpg", "I'm a new user.", email]);
        res.json('Done');
        console.log('register end');
    })

module.exports = router;
