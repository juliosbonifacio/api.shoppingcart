'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    status: {
        type: String,
        default: 'pending'
    },
    entries: [
        {
            idProduct: {
                type: Schema.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                min: 0,
                max:99999
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Cart', CartSchema);