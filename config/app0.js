const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs");
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo')
const crypto = require('crypto')
var routes = require('./routes')

require('dotenv').config();

//create Express application
const app = express()

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(express.json())

//create session
app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
            mongoUrl: process.env.DB_STRING
      }),
      cookie: {
        maxAge: 1000*60*60*24 //1 day
      }
    })
);

//authentication
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  if (typeof req.user != "undefined"){
    res.locals.admin = req.user.isAdmin;
    res.locals.firstName = req.user.firstName;
  }
  next();
})

//routes
 app.use(routes)


app.listen(3000, function(req,res){
  console.log("Listening on port 3000")
})
