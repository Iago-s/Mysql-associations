const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(connection) {
    super.init({
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      amount: DataTypes.INTEGER
    }, {
      sequelize: connection
    });
  }

  static associate(models) {
    this.belongsTo(models.Supermarket, { foreignKey: 'supermarket_id', as: 'supermarket' });
    this.hasOne(models.ImgProduct, { foreignKey: 'imgproduct_id', as: 'imgproduct' });
  }
}

module.exports = Product;