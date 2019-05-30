var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Wish', {
    user_name: {
        type: String,
        default: ''
    },
    wish_id: {
        type: String,
        default: ''
    },

    description: {
        type: String,
        default: ''
    },

    publish_date: {
        type: Date,
        default: Date.now()
    },

    ddl: {
        type: Date,
        default: ''
    },

    bonus: {
        type: Number,
        default: ''
    }
});