'use strict';

module.exports = function(app) {
    var shoppingCart = require('../controllers/shoppingCartController');

    // shoppingCart Routes
    app.route('/api/product')
        .get(shoppingCart.list_all_products)
        .post(shoppingCart.create_a_product);

    app.route('/api/product/:productId')
        .get(shoppingCart.read_a_product)
        .put(shoppingCart.update_a_product)
        .delete(shoppingCart.delete_a_product);
};