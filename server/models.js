const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const photo = new Schema({
    photoID: String,
    src: String,
    height: Number,
    width: Number
});

exports.Photo = model('Photo', photo);