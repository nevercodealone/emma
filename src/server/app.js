const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();


const combinedRouter = require('./routers');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));



app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(combinedRouter);


module.exports = app;
