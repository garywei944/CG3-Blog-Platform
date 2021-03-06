const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

router
    //Retrieving data from database and show it in the homepage html
    .get('/homepage', async (req, res) => {
        try {
            const result = await db.query('SELECT * FROM post ORDER BY random() LIMIT 6');
            const results = (result) ? result.rows : null;
            res.send(results);
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    })

module.exports = router;
