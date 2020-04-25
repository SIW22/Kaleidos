const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required:true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
}, {timestamps: true});


const User = mongoose.model('User', UserSchema);

module.exports = User;