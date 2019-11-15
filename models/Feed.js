// Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

const FeedSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        
    },
    image: {
        type: String,
        
    },
    likes: {
        type: Array,
        default: []
       
    },
    shares: {
        type: Array,
        default: []
         
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Feed = mongoose.model('feed', FeedSchema);