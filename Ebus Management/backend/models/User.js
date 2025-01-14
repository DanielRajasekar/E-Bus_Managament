const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    role: { type: String, default: 'user' } // Add role field
});

module.exports = mongoose.model('User ', userSchema);