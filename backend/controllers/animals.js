'use strict'

var fs = require('fs');
var path = require('path');

var User = require('../models/user');
var Animal = require('../models/animal');

function pruebas(req, res) {
  res.status(200).send({
    message: 'Probando controlador animales',
    user: req.user
  });
}

function saveAnimal(req, res){
  var animal = new Animal();
  var params = req.body;

  if (params.name){
    animal.name = params.name;
    animal.description = params.description;
    animal.year = params.year;
    animal.image = null;
    animal.user = req.user.sub;

    animal.save((err, animalStored) => {
      if (err){
        res.status(500).send({ message: 'Error al guardar animal' });
      }else{
        if (!animalStored){
          res.status(404).send({ message: 'NO se ha guardado el animal' });
        }else{
          res.status(200).send({ animal: animalStored });
        }
      }
    })
  }else{
    res.status(500).send({ message: 'Parámetros incorrectos' });
  }
}

function getAnimals(req, res){
  Animal.find({}).populate({ path: 'user'}).exec((err, animals) => {
    if (err){
      res.status(500).send({ message: 'Error al cargar animales' });
    }else{
      if (!animals){
        res.status(404).send({ message: 'No hay animales' });
      }else{
        res.status(200).send({ animals });
      }
    }
  })
}

function getAnimal(req, res){
  var animalId = req.params.id;

  Animal.findById(animalId).populate({ path: 'user'}).exec((err, animal) => {
    if (err){
      res.status(500).send({ message: 'Error al cargar animal' });
    }else{
      if (!animal){
        res.status(404).send({ message: 'Animal no encontrado' });
      }else{
        res.status(200).send({ animal });
      }
    }
  })
}

function updateAnimal(req, res){
  var animalId = req.params.id;
  var update = req.body;

  Animal.findByIdAndUpdate(animalId, update, { new: true}, (err, animalUpdated) => {
    if (err){
      res.status(500).send({ message: 'Error al cargar animal' });
    }else{
      if (!animalUpdated){
        res.status(404).send({ message: 'Animal no encontrado' });
      }else{
        res.status(200).send({ animal: animalUpdated });
      }
    }
  })
}

function uploadImage(req, res) {
  var animalId = req.params.id;
  var fileName = 'No subido...';

  if (req.files){
    var filePath = req.files.image.path;
    var fileSplit = filePath.split('\\');
    var fileName = fileSplit[2];

    var extSplit = fileName.split('\.');
    var fileExt = extSplit[1];

    if (fileExt =='png' || fileExt == 'jpg' || fileExt == 'jpeg'){

      Animal.findByIdAndUpdate(animalId, { image: fileName}, { new: true}, (err, animalUpdated) => {
        if (err) {
          res.status(500).send({ message: 'Error al actualizar el animal'});
        }else{
          if (!animalUpdated){
            res.status(404).send({ message: 'No se ha podido actualizar el animal'});
          }else{
            res.status(200).send({ animal: animalUpdated, image: fileName });
          }
        }
      });
    }else{
      // Borrar imagen en caso de error (Se guardan automáticamente por lo que hay que hacerlo manual)
      fs.unlink(filePath, (err) => {
        if (err){
          res.status(500).send({ message: 'Tipo de archivo incorrecto y fichero NO borrado'});
        }else{
          res.status(200).send({ message: 'Tipo de archivo incorrecto'});
        }
      });
    }

  }else{
    res.status(200).send({ message: 'No se han subido ficheros'});
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var pathFile = './uploads/animals/' + imageFile;

  fs.exists(pathFile, function(exists){
    if (exists){
      res.sendFile(path.resolve(pathFile));
    }else{
      res.status(200).send({ message: 'La imagen no existe'});
    }
  });
}

function deleteAnimal(req, res){
  var animalId = req.params.id;

  Animal.findByIdAndRemove(animalId, (err, animalRemoved) => {
    if (err) {
      res.status(500).send({ message: 'Error al eliminar animal'});
    }else{
      if (!animalRemoved){
        res.status(404).send({ message: 'Animal no encontrado'});
      }else{
        res.status(200).send({ animal: animalRemoved});
      }
    }
  })
}

module.exports = {
  pruebas,
  saveAnimal,
  getAnimals,
  getAnimal,
  updateAnimal,
  uploadImage,
  getImageFile,
  deleteAnimal
};
