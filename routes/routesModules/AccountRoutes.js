const express = require("express")
const app = express()

const connection = require('../../config/database');
const User = connection.models.User;
const Article = connection.models.Article;

app.get("/", function(req,res){
  var name = req.user.firstName+' '+req.user.lastName
  var id = req.user.savedArticles;

if (id.length>0){
  Article.find({'_id':{$in: id}}, function (err, articles){
    if (err){
        console.log(err);
    }else{
        res.render("account", {name: name, articles: articles });
    }

  });
}else{
  res.render("account", {name: name, articles: [] });
}

})

module.exports = app;
