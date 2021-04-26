const Router = require('express-promise-router');
const db = require(appRoot + '/db')
const router = new Router();

const query_text = "insert into post (username, title, content, post_time) values ($1, $2, $3, $4)";

// api to post a new blog
// return 201 on success, otherwise 404
router.post('/post', async function (req, res, next) {
    const username = req.body.username;
    const title = req.body.title;
    const content = req.body.content;
    const post_time = new Date();

    const post_info = {
        username: username,
        title: title,
        content: content,
        post_time: post_time
    };

    console.log("username: "+username,"title: "+title,"content: "+content);

    // Validate the coming package and validate the inert is successful
    if (checkPost(username, title, content)) {
        try {
            const result = await db.query(query_text, [username, title, content, post_time]);
            const post_id = await db.query("SELECT * FROM post WHERE username = $1 AND post_time = $2", [username,post_time]);
            post_info.post_id = post_id;
            res.status(201);
            res.json(post_info);
        } catch (err) {
            console.error(err);
            res.status(400);
            res.send(err);
        }
    } else {
        const err_msg = 'Error: POST /post: invalid input.\n' + JSON.stringify(post_info);
        console.error(err_msg);
        res.status(400);
        res.send(err_msg);
    }

});

function checkPost(username, title, content) {
    return username && title && content && username.length > 0 && title.length > 0 && content.length > 0;
}

module.exports = router;
