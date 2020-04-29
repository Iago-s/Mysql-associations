const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Client = require('../models/Client');
const Imgclient = require('../models/Imgclient');

const Supermarket = require('../models/Supermarket');
const ImgSupermarket = require('../models/Imgsupermarket');

const Product = require('../models/Product');
const ImgProduct = require('../models/Imgproduct');

const connection = new Sequelize(dbConfig);

Client.init(connection);
Imgclient.init(connection);

Supermarket.init(connection);
ImgSupermarket.init(connection);

Product.init(connection);
ImgProduct.init(connection);

Client.associate(connection.models);
Imgclient.associate(connection.models);

Supermarket.associate(connection.models);
ImgSupermarket.associate(connection.models);

Product.associate(connection.models);
ImgProduct.associate(connection.models);

module.exports = connection;