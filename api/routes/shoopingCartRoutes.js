'use strict';

module.exports = function(app) {
    var shoppingCart = require('../controllers/shoppingCartController');

    // Product Routes
    app.route('/api/product')
        .get(shoppingCart.list_all_products)
        .post(shoppingCart.create_a_product);

    app.route('/api/listarProductos')
        .get(shoppingCart.list_all_products);

    app.route('/api/product/:productId')
        .get(shoppingCart.read_a_product)
        .put(shoppingCart.update_a_product)
        .delete(shoppingCart.delete_a_product);

    // Cart
    app.route('/api/crearCarrito')
        .get(shoppingCart.createCart);

    app.route('/api/verCarrito/:cartId')
        .get(shoppingCart.readCart);

    // Shopping cart
    app.route('/api/comprar/:cartId')
        .get(shoppingCart.buyCart);

    app.route('/api/agregarAlCarrito')
        .post(shoppingCart.addProductToCart);

    app.route('/api/quitarDelCarrito')
        .post(shoppingCart.removeProductFromCart);
};