/**
 * @file /server/index.js
 * @author GPlay97
 * @description Initialization script for server
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config.json');
const temperature = require('./modules/temperature');

// body parser initialization
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// apply default headers
app.use((req, res, next) => {
    res.contentType('application/json');
    res.setHeader('Access-Control-Allow-Origin', ((!req.get('origin') || req.get('origin') === 'null') ? '*' : req.get('origin')));
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// the routes
app.get('/temperature', temperature.getTemperature);
app.post('/temperature', temperature.postTemperature);

// start server
app.listen(config.PORT, () => console.log('Server started on port ' + config.PORT));