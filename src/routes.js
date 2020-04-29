const express = require('express');

const multer = require('multer');
const multerConfig = require('./config/multer');

const ClientController = require('./controllers/ClientController');
const SupermarketController = require('./controllers/SupermarketController');
const ProductController = require('./controllers/ProductController');

const routes = express.Router();

routes.get('/clients/:client_id', ClientController.index);
routes.get('/clients', ClientController.indexAll);
routes.post('/clients', multer(multerConfig).single('imgclient'), ClientController.store);
routes.delete('/clients/:id/delete', ClientController.delete);
routes.post('/clients/:id/update', ClientController.update);

routes.get('/supermarkets/:supermarket_id', SupermarketController.index);
routes.get('/supermarkets', SupermarketController.indexall);
routes.post('/supermarkets', multer(multerConfig).single('imgsupermarket'), SupermarketController.store);
routes.delete('/supermarkets/:id/delete', SupermarketController.delete);
routes.post('/supermarkets/:id/update', SupermarketController.update);

routes.get('/supermarkets/:supermarket_id/products', ProductController.index);
routes.post('/supermarkets/:supermarket_id/products', ProductController.store);
routes.delete('/supermarkets/:supermarket_id/products/:id/delete', ProductController.delete);
routes.post('/supermarkets/:supermarket_id/products/:id/update', ProductController.update);

module.exports = routes;