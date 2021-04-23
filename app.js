const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
global.appRoot = path.resolve(__dirname);

const mountRoutes = require('./routes');

const app = express();

app
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.urlencoded({extended: true}))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

// Mount routes in ./routes/index.js
mountRoutes(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
