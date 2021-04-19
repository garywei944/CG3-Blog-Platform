const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/test', (req, res) => res.render('pages/test', {users: ["John", "Paul", "Ringo"]}))
  .get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  })
  // /db is a debugging view into the complete order_table database table
  .get('/db', async (req, res) => {
    try {
      client = await pool.connect();
      result = await client.query("SELECT * FROM user_account;");
      client.release();
      results = new Object();
      results.results = (result) ? result.rows : null;
      client = await pool.connect();
      result = await client.query("SELECT * FROM pg_tables WHERE tablename NOT LIKE 'pg_%' AND tablename NOT LIKE 'sql_%';");
      results.results2 = (result) ? result.rows : null;
      res.render('pages/db', results );
      client2.release();
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
      const results = { 'results': (result) ? result.rows : null};
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
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  
  .get('/gavin', (req, res) => res.render('pages/gavin'))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
