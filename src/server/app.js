const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const decodeToken = require('./middleware/decodeToken');

const exphbs  = require('express-handlebars');

require('dotenv').config();


const combinedRouter = require('./routers');

const app = express();
app.set('views', __dirname + '/views');
app.engine('hbs', exphbs(
        {
            defaultLayout: 'default',
            layoutsDir: __dirname + '/views/layouts',
            partialsDir: __dirname + '/views/partials',
            extname: '.hbs'
        }
    )
);
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(decodeToken);

app.use(combinedRouter);


module.exports = app;
