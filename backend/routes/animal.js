'use strict'

var express = require('express');
var AnimalControler = require('../controllers/animals');

var api = express.Router();

var mdAuth = require('../middlewares/authenticated');
var mdAdmin = require('../middlewares/is-admin');

var multipart = require('connect-multiparty');
var mdUpload = multipart({ uploadDir: './uploads/animals'});

api.get('/pruebas-animales', mdAuth.ensureAuth, AnimalControler.pruebas);
api.post('/animal', [mdAuth.ensureAuth, mdAdmin.isAdmin], AnimalControler.saveAnimal);
api.get('/animals', AnimalControler.getAnimals);
api.get('/animals/:id', AnimalControler.getAnimal);
api.put('/animals/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], AnimalControler.updateAnimal);
api.post('/upload-image-animal/:id', [mdAuth.ensureAuth, mdUpload, mdAdmin.isAdmin], AnimalControler.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalControler.getImageFile)
api.delete('/animals/:id', [mdAuth.ensureAuth, mdAdmin.isAdmin], AnimalControler.deleteAnimal);

module.exports = api;
