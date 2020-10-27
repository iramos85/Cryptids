// The Post model

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const postSchema = new mongoose.Schema({
    thread: ObjectId,
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'},
    post: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post