'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ngzoo', { useMongoClient: true })
  .then(() => {
    console.log('[Connected...]');
    app.listen(port, () => {
      console.log('Local server up...')
    })
  })
  .catch(err => console.log(err));

