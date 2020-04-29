const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Client = require('../models/Client');
const Imgclient = require('../models/Imgclient');

const Supermarket = require('../models/Supermarket');
const Product = require('../models/Product');

const connection = new Sequelize(dbConfig);

Client.init(connection);
Imgclient.init(connection);

Supermarket.init(connection);
Product.init(connection);

Supermarket.associate(connection.models);
Product.associate(connection.models);

Client.associate(connection.models);
Imgclient.associate(connection.models);

module.exports = connection;