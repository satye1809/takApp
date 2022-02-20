const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { text } = require('express');

const feedsSchema = new mongoose.Schema({

    headline :{
        type:String,
        required:true
    },
    category :{
        type:String,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },
    uploadTime:{
        type:Date,
        required:true
    },
    media:{
        type:String,
        required:true
        }
})

feedsSchema.index({"headline":"text"})
const Feeds = mongoose.model('Feeds',feedsSchema);

module.exports = Feeds;