
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookname: {
        type: String
    },
    bookId: {
        type: String
    },
    rentedBy: {
        type: String
    },
    rentedDate: {
        type: String
    },
    status: {
        type: String,
        enum: ["rented", "available"]
    }
});

module.exports = mongoose.model('Book', BookSchema);