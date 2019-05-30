var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('User', {
    user_name: {
        type: String,
        default: ''
    },

    code: {
        type: String,
        default: ''
    },

    email: {
        type: String,
        default: ''
    },

    rank: {
        type: Number,
        default: 0
    }

});