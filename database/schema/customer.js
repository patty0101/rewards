const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    amt: {
        type: Number,
    }
}, {timestamps: true});

module.exports = new mongoose.model('Customer', CustomerSchema);