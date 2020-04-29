const { Model, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

class ImgProduct extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      key: DataTypes.STRING,
      url: DataTypes.STRING,
    }, {
      hooks: {
        beforeSave: (img) => {
          img.url = `${process.env.IMG_URL}/files/${img.key}`;
        },
        beforeDestroy: (img) => {
          return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', img.key));
        }
      },
      sequelize: connection
    });
  }

  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'imgproduct_id', as: 'product' });
  }
}

module.exports = ImgProduct;