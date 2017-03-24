const express = require('express');

const combinedRouter = express.router();


const apiRouter = require('./api');
const appRouter = require('/app');

combinedRouter.use('/api', apiRouter);
combinedRouter.use('/', appRouter);


module.exports = combinedRouter;
