const { Model, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

class Imgclient extends Model {
  static init(connection) {
    super.init({
      name: DataTypes.STRING,
      size: DataTypes.INTEGER,
      key: DataTypes.STRING,
      url: DataTypes.STRING,
    }, {
      hooks: {
        beforeSave: (post) => {
          post.url = `${process.env.IMG_URL}/files/${post.key}`;
        },
        beforeDestroy: (img) => {
          return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', img.key));
        }
      },
      sequelize: connection
    });
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
  }
}

module.exports = Imgclient;