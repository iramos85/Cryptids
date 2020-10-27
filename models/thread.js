// The Thread model
const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
    title:  String,
    postdate: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'}
});

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread