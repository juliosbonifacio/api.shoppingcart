'use strict';

var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    Cart = mongoose.model('Cart');


exports.list_all_products = function(req, res) {
    Product.find({}, function(err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};


exports.create_a_product = function(req, res) {
    var newProduct = new Product(req.body);
    newProduct.save(function(err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.read_a_product = function(req, res) {
    Product.findById(req.params.productId, function(err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

exports.update_a_product = function(req, res) {
    Product.findOneAndUpdate({_id:req.params.productId}, req.body, {new: true}, function(err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};
// Product.remove({}).exec(function(){});
exports.delete_a_product = function(req, res) {

    Product.remove({
        _id: req.params.productId
    }, function(err, product) {
        if (err)
            res.send(err);
        res.json({ message: 'Product successfully deleted' });
    });
};


/* Cart */
exports.createCart = function(req, res) {
    var newCart = new Cart();
    newCart.save(function(err, cart) {
        if (err)
            res.send(err);
        console.log(cart);
        res.json(cart);
    });
};

exports.readCart = function(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.cartId)) {
        return res.status(400).send({
            message: 'Cart Id is invalid'
        });
    }

    Cart.findById(req.params.cartId, function(err, cart) {
        if (err) {
            return res.status(404).send({
                message: 'CarritoNoExiste'
            });
        }
        res.json(cart);
    });
};

exports.buyCart = function(req, res) {
    //Check if Cart if exist
    Cart.findOne({_id:req.params.cartId, entries: {$exists: true, $ne: []}}, function(err, cart) {
        if (err){
            return res.status(404).send({
                message: 'CarritoNoExiste'
            });
        }

        //Cart is empty
        if (!cart) {
            return res.status(200).send({
                message: 'CarritoVacio'
            });
        }

        //Update the status to paid
        cart.status = 'paid';
        cart.save(function (err) {
            if (err) {
                return res.status(422).send({
                    message: 'There was an error during save the cart'
                });
            } else {
                res.json(cart);
            }
        });
    });
};

/* Add product to cart */
exports.addProductToCart = function(req, res) {
    //Check if Cart if exist
    Cart.findOne({_id:req.params.cartId, entries: {$exists: true, $ne: []}}, function(err, cart) {
        if (err){
            return res.status(404).send({
                message: 'CarritoNoExiste'
            });
        }

        //Cart is paid
        if (cart.status == 'paid') {
            return res.status(200).send({
                message: 'CarritoVendido'
            });
        }

        //Update the entries
        var existProduct = false;
        cart.entries.forEach(function(entry){
            //When product exits
            if (entry.idProduct == '123'){
                entry.quantity = entry.quantity + 1;
            } else {
                existProduct = true;
            }
        });

        if (existProduct) {
            var entry = [];
            entry.idProduct = '123';
            entry.quantity = 1;
            cart.entries.push(entry);
        }

        cart.save(function (err) {
            if (err) {
                return res.status(422).send({
                    message: 'There was an error during save the add product to cart'
                });
            } else {
                res.json(cart);
            }
        });
    });
};
exports.removeProductFromCart = function(req, res) {
    Cart.findOneAndUpdate({_id:req.params.cartId}, req.body, {new: true}, function(err, cart) {
        if (err) {
            console.log('addProductToCart:');console.log(err);
            res.send(err);
        }
        res.json(cart);
    });
};