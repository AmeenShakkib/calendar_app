const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
},{timestamps:true});

const Birthday = mongoose.model('Birthday', birthdaySchema);

module.exports = Birthday;