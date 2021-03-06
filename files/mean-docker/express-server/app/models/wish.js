var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Wish', {
    user_name: {
        type: String,
        default: ''
    },
    receiver: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        default: ''
    },

    bonus: {
        type: Number,
        default: ''
    },
    isFinishes: {
        type: Boolean,
        default: false
    }
});