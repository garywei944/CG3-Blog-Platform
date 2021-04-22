const Router = require('express-promise-router');
const db = require('~/db');
const router = new Router();

router
    //check login
    .post('/login', async (req, res) => {
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
    .post('/register', async (req, res) => {
        console.log('register start');
        let email = req.body.email;
        let psw = req.body.psw;
        console.log(`register: ${email} ${psw}`);
        let result = await db.query("INSERT INTO user_account VALUES ($1, $2, $3, $4);", [email, psw, "images/akari.jpg", "I'm a new user."]);
        res.json('Done');
        console.log('register end');
    })

module.exports = router;
