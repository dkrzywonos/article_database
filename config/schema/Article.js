const mongoose = require("mongoose")

const articleSchema = mongoose.Schema({
  author:[{
    type: String,
    required: true
  }],
  title:{
    type: String,
    required: true
  },
  date:{
    type: Date
  },
  keywords: [{
    type: String
  }],
  publisher: String,
  abstract: String
})

module.exports = articleSchema
