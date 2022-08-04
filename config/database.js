const mongoose = require('mongoose');
require('dotenv').config();

//connect to MongoDB
const mongourl = process.env.DB_STRING;

const connection = mongoose.createConnection(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = require('./schema/User.js')
const User = connection.model('User', userSchema);

const articleSchema = require('./schema/Article.js')
const Article = connection.model('Article', articleSchema);

module.exports = connection;
