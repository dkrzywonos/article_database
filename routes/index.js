const express = require("express")
const app = express()
const isAuth = require('./auth').isAuth;
const isAdmin = require('./auth').isAdmin;

const userRoute = require('./routesModules/RegisterRoutes')
app.use('/register', userRoute)

const loginRoute = require('./routesModules/LoginRoutes')
app.use('/login', loginRoute)

const addRoute = require('./routesModules/AddRoutes')
app.use('/add', isAdmin, addRoute)

const accountRoute = require('./routesModules/AccountRoutes')
app.use('/my-account', isAuth, accountRoute)

const searchRoute = require('./routesModules/SearchRoutes')
app.use('/search', searchRoute)

const saveArticleForUser = require('./routesModules/SaveArticleForUser')
app.use('/saveArticleForUser', isAuth, saveArticleForUser)

const removeArticleForUser = require('./routesModules/RemoveArticleForUser')
app.use('/removeArticleForUser', isAuth, removeArticleForUser)

app.get("/", function(req,res){
  res.render("index")
})


app.get('/login-failure', function(req,res){
  res.render("login",{
    colorLogin: "red",
    statusLogin:"Nie udało się zalogować"
  })
})

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/')
})


module.exports = app;
