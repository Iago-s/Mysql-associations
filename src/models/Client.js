const { Model, DataTypes } = require('sequelize');

class Client extends Model {
  static init(connection) {
    super.init({
      account_type: DataTypes.STRING,
      name: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      district: DataTypes.STRING,
      complement: DataTypes.STRING,
      city: DataTypes.STRING,
      uf: DataTypes.STRING,
      zipcode: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize: connection
    });
  }
}

module.exports = Client;