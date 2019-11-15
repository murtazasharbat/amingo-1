const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

const CompanySchema= new Schema({
    companyName: {
        type: String,
        required: true
    },
    numberOfEmp: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
        
    },
    website: {
        type: String,
        required: true
        
    },
    contact: {
        type: Number,
        required: true
       
    },
    logo: {
        type: String,
        required:true
         
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Comapny = mongoose.model('comapny', CompanySchema);