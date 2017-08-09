'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    ProductLists: {
        type: String,
        Required: 'Kindly enter the product lists'
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['paid', 'pending', 'error']
        }],
        default: ['pending']
    }
});


module.exports = mongoose.model('Cart', CartSchema);