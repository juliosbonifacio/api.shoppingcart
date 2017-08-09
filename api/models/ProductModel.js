'use strict';


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    price: {
        type: Number,
        Required: 'Kindly enter the price of the product'
    },
    name: {
        type: String,
        Required: 'Kindly enter the name of the product'
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['enabled', 'disabled']
        }],
        default: ['enabled']
    }
});


module.exports = mongoose.model('Product', ProductSchema);