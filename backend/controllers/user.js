'use strict'

var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');

var jwt = require('../services/jwt');

function pruebas(req, res) {
  res.status(200).send({
    message: 'Probando controlador usuario',
    user: req.user
  });
}

function saveUser(req, res) {
  var user = new User();

  //Recoger los parámetros del body
  var params = req.body;



  if (params.password && params.name && params.surname && params.email) {
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = null;

    User.findOne({ email: user.email.toLowerCase() }, (err, userExists) => {
      if (err) {
        res.status(500).send({ message: 'Error al registrar el usuario' });
      } else {
        if (!userExists) {
          //Cifrar contraseña
          bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;

            user.save((err, userStored) => {
              if (err) {
                res.status(500).send({ message: 'Error al guardar el usuario' });
              } else {
                if (!userStored) {
                  res.status(404).send({ message: 'NO se ha registrado el usuario' });
                } else {
                  res.status(200).send({ user: userStored });
                }
              }
            })
          });
        } else {
          res.status(404).send({ message: 'El usuario ya existe' });
        }
      }
    });

  } else {
    res.status(500).send({ message: 'Número de parámetros incorrecto' });
  }
}

function login(req, res) {
  var params = req.body;

  var email = params.email;
  var password = params.password;

  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error al registrar el usuario' });
    } else {
      if (user){
        bcrypt.compare(password, user.password, (err, check) => {
          if (check) {
            if (params.getToken){ //Generar token
              res.status(200).send({
                token: jwt.createToken(user)
              });
            }else {
              res.status(200).send({ user });
            }
          } else {
            res.status(404).send({ message: 'Usuario y contraseña no coinciden' });
          }
        });

      } else {
        res.status(404).send({ message: 'El usuario no existe' });
      }
    }
  });
}

function updateUser (req, res) {
  var userId = req.params.id;
  var update = req.body;

  delete update.password; //Para que no machaque la propiedad cuando viene a null

  if (userId != req.user.sub){
    return res.status(500).send({ message: 'No tienes permiso para actualizar el usuario'});
  }

  User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
    if (err) {
      res.status(500).send({ message: 'Error al actualizar el usuario'});
    }else{
      if (!userUpdated){
        res.status(404).send({ message: 'No se ha podido actualizar el usuario'});
      }else{
        res.status(200).send({ user: userUpdated });
      }
    }
  });
}

function uploadImage(req, res) {
  var userId = req.params.id;
  // var fileName = 'No subido...';

  if (req.files){
    var filePath = req.files.image.path;
    var fileSplit = filePath.split('\\');
    var fileName = fileSplit[2];

    var extSplit = fileName.split('\.');
    var fileExt = extSplit[1];


    if (fileExt =='png' || fileExt == 'jpg' || fileExt == 'jpeg'){
      if (userId != req.user.sub){
        return res.status(500).send({ message: 'No tienes permiso para actualizar el usuario'});
      }

      User.findByIdAndUpdate(userId, { image: fileName}, { new: true}, (err, userUpdated) => {
        if (err) {
          res.status(500).send({ message: 'Error al actualizar el usuario'});
        }else{
          if (!userUpdated){
            res.status(404).send({ message: 'No se ha podido actualizar el usuario'});
          }else{

           res.status(200).send({ user: userUpdated, image: fileName });
          }
        }
      });
    }else{
      // Borrar imagen en caso de error (Se guardan automáticamente por lo que hay que hacerlo manual)
      fs.unlink(filePath, (err) => {
        if (err){
          res.status(500).send({ message: 'Tipo de archivo incorrecto y fichero NO borrado'});
        }else{
          res.status(404).send({ message: 'Tipo de archivo incorrecto'});
        }
      });
    }

  }else{
    res.status(200).send({ message: 'No se han subido ficheros'});
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  var pathFile = './uploads/users/' + imageFile;

  fs.exists(pathFile, function(exists){
    if (exists){
      res.sendFile(path.resolve(pathFile));
    }else{
      res.status(404).send({ message: 'La imagen no existe'});
    }
  });
}

function getKeepers(req, res){
  User.find({ role: 'ROLE_ADMIN'}).exec((err, users) =>{
    if (err) {
      res.status(500).send({ message: 'Error al cargar keepers'});
    }else{
      if(!users){
        res.status(404).send({ message: 'No hay keepers'});
      }else{
        res.status(200).send({ users });
      }
    }
  })

}

module.exports = {
      pruebas,
      saveUser,
      login,
      updateUser,
      uploadImage,
      getImageFile,
      getKeepers
    }
