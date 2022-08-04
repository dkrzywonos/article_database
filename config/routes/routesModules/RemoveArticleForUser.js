const express = require("express")
const app = express()

const connection = require('../../config/database');

const User = connection.models.User;

app.post("/", function(req,res){
  const articleId = req.query.id;
console.log(articleId);
  User.updateOne(
    { _id: req.user._id },
    { $pull: { savedArticles: articleId } },
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/my-account');
      }
    }
);
})

module.exports = app;
