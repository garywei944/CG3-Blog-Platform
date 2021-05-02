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
    .use(express.json()) // 这个json parser是不是没用到？ express的middleware没有next()的话不会在运行完上面那个urlencoded之后继续运行运行下面这个。
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')

// Mount routes in ./routes/index.js
mountRoutes(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
