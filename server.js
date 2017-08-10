var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// module used to create, sign, and verify tokens
var jwt    = require('jsonwebtoken');

//config file
var config = require('./config');

var port = process.env.PORT || config.port;

//Models
var Product = require('./api/models/ProductModel'),
    Cart = require('./api/models/CartModel');

// Use mongoose to connect with mongodb
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    useMongoClient: true
});

// use body parser can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routes
var routes = require('./api/routes/shoopingCartRoutes');
routes(app);

// mount all routes on /api path
//app.use('/api', routes);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);