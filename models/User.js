// Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    occupation: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);