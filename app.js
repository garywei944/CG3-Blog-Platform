const express = require('express');
const favicon = require('serve-favicon')
const path = require('path');
const PORT = process.env.PORT || 5000;
global.appRoot = path.resolve(__dirname);

const mountRoutes = require('./routes');

const app = express();

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    .use(express.urlencoded({extended: true}))
    .use(express.json())
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

// Mount routes in ./routes/index.js
mountRoutes(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
