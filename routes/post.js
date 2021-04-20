const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();

// api to post a new blog
// return 201 on success, otherwise 404
router.post('/post', async function (req, res, next) {
    const username = req.body.username;
    const title = req.body.title;
    const content = req.body.content;
    const post_time = Date.now();

    let post_info = {
        username: username,
        title: title,
        content: content,
        post_time: post_time
    };

    console.log(req.body);

    res.sendStatus(201);

    if (checkPost(username, title, content)) {
        let query_text = `insert into post (username, title, content, post_time) values (${username}, ${title}, ${content}, ${post_time})`;

        try {
            // const client = await pool.connect();

            // INSERT the new order information
            // const result = await client.query(query_text);
            const result = await db.query(query_text);

            // // get the new ID number returned from the INSERT query
            // const order_number = (result) ? result.rows[0].id : null;
            //
            // // with the new order number, get the appropriate customer info
            // const select_result = await client.query('SELECT * FROM order_table WHERE id = ' + order_number);
            // const results = (select_result) ? select_result.rows[0] : null;
            //
            // const order_status = results.order_status;
            // const first_name = results.first_name;
            // const last_name = results.last_name;
            // const street_address = results.street_address;
            // const city_state = results.city_address;
            // const order = results.food_order;
            //
            // let customer_info = {
            //     first: first_name, last: last_name, streetaddress: street_address,
            //     cityaddress: city_state, order: order, ordernumber: order_number,
            //     orderstatus: order_status
            // };
            //
            // res.render('pages/customerstatus', customer_info);

            console.log(result)

            client.release();
        } catch (err) {
            console.error(err);
            res.send("Error " + err);
        }
    } else {
        res.render('pages/confirmation', confirm_info);
    }

});

function checkPost(username, title, content) {
    return username && title && content && username.length > 0 && title.length > 0 && content.length > 0;
}

module.exports = router;
