const mongoose = require('mongoose');

const cryptidSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    description:  { type: String, required: true },
    img: {type: String, required: false},
    temperament: Boolean
});

const Cryptid = mongoose.model('Cryptid', cryptidSchema);

module.exports = Cryptid;