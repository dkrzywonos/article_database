const express = require("express");
const app = express()
const passport = require('passport');
const genPassword = require('../../lib/passwordUtils').genPassword;
const connection = require('../../config/database');
const User = connection.models.User;

app.post("/", function(req,res,next){
  //funkcja generująca salt i hash hasła wprowadzonego przez użytkownika
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  //tworzenie modelu nowego użytkownika
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    salt: salt,
    hash: hash,
  })

  user.save()
    .then((user)=>{
      console.log(user);
    })
  res.redirect('/login')
})
module.exports = app;
