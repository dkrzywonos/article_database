const express = require("express")
const app = express()

const connection = require('../../config/database');
const Article = connection.models.Article;

app.get("/", function(req,res){
  res.render("addArticle",{
    statusAdd:""
  })
})

app.post("/", function(req,res){
  //tworzenie nowego modelu artykułu i pobieranie danych z formularza
  const article = new Article({
    author: req.body.articleAuthor.split(", "),
    title: req.body.articleTitle,
    date: req.body.publication,
    keywords: req.body.keywords.split(", "),
    publisher: req.body.publisher,
    abstract: req.body.abstract
  })
  //zapisanie artykułu do bazy
  article.save(function(err,result){
    if (err){
      res.render("addArticle",{
        statusAdd:"Nie udało sie dodać artykułu"
      })
    }
    else{
      res.render("addArticle",{
        statusAdd:"Artykuł dodany"
      })
    }
})

})
module.exports = app;
