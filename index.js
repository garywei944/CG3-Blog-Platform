const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.urlencoded({extended: true}))
    .get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    })
    .get('/gavin', (req, res) => res.render('pages/gavin'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
