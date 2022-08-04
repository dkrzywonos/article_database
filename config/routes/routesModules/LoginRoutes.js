const express = require("express")
const app = express()
const passport = require("passport");

const connection = require('../../config/database');
const User = connection.models.User;

app.get("/", function(req,res){
  res.render("login",{
    colorLogin: "",
    statusLogin:""
  })
})

//uwierzytalnianie za pomocą funkcji authenticate()
app.post("/", passport.authenticate('local', {failureRedirect: '/login-failure', successRedirect: '/'}));

module.exports = app;
