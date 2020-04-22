const express = require('express');

const ClientController = require('./controllers/ClientController');
const SupermarketController = require('./controllers/SupermarketController');
const ProductController = require('./controllers/ProductController');

const routes = express.Router();

routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.store);
routes.delete('/clients/:id/delete', ClientController.delete);
routes.post('/clients/:id/update', ClientController.update);

routes.get('/supermarkets', SupermarketController.index);
routes.post('/supermarkets', SupermarketController.store);
routes.delete('/supermarkets/:id/delete', SupermarketController.delete);
routes.post('/supermarkets/:id/update', SupermarketController.update);

routes.get('/supermarkets/:supermarket_id/products', ProductController.index);
routes.post('/supermarkets/:supermarket_id/products', ProductController.store);
routes.delete('/supermarkets/:supermarket_id/products/:id/delete', ProductController.delete);
routes.post('/supermarkets/:supermarket_id/products/:id/update', ProductController.update);

module.exports = routes;