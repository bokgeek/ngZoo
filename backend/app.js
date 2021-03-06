'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar ruras
var user_routes = require('./routes/user');
var animal_routes = require('./routes/animal');

//Middlewares bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras y CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request_Method, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//Rutas base
app.use('/api', user_routes);
app.use('/api', animal_routes);

module.exports = app;
