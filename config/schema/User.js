const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email:{
    type: String,
    unique: true,
    required: true
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  salt: String,
  hash: String,
  isAdmin: Boolean,
  savedArticles: [{
    type: String
  }],
})


module.exports = userSchema
