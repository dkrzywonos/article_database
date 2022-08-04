const express = require("express")
const app = express()

const connection = require('../../config/database');
const Article = connection.models.Article;

app.get("/", function(req,res){
  res.render("searchArticle", {articles: []})
})

app.post("/", function(req,res){
  console.log(req.body);
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  if(req.body.startDate==""){
    startDate = '1900-01-01';
  }
  if(req.body.endDate==""){
    endDate = '2100-01-01';
  }
console.log(startDate);
  Article.find({
      author: { "$regex": req.body.articleAuthor, "$options": "i" },
      title: {"$regex": req.body.articleTitle, "$options": "i"},
      keywords: {"$regex": req.body.keywords, "$options": "i"},
      publisher:{"$regex": req.body.publisher, "$options": "i"},
      date: { $gt: startDate, $lt: endDate }
    }, function (err, articles){
    if (err){
        console.log(err);
    }else{
        res.render('searchArticle', { articles:articles });
    }

  });
})

module.exports = app;
