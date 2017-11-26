'use strict'

var express = require('express');
var UserControler = require('../controllers/user');

var api = express.Router();

var mdAuth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/users'});

api.get('/pruebas', mdAuth.ensureAuth, UserControler.pruebas);
api.post('/register', UserControler.saveUser);
api.post('/login', UserControler.login);
api.put('/update-user/:id', mdAuth.ensureAuth, UserControler.updateUser);
api.post('/upload-image-user/:id', [mdAuth.ensureAuth, mdUpload], UserControler.uploadImage);
api.get('/get-image-file/:imageFile', UserControler.getImageFile)
api.get('/keepers', UserControler.getKeepers)

module.exports = api;
