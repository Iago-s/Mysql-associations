const Supermarket = require('../models/Supermarket');
const Product = require('../models/Product');
const ImgProduct = require('../models/Imgproduct');

module.exports = {
  async index(request, response) {
    const { supermarket_id } = request.params;

    const supermarket = await Supermarket.findByPk(supermarket_id, {
      include: { association: 'products' }
    });

    if(!supermarket) {
      return response.status(400).json({ error: 'Supermercado não existe' });
    }

    return response.json({ supermarket });
  },

  async store(request, response) {
    const { supermarket_id } = request.params;
    const { type, name, price, amount } = request.body;

    const supermarket = await Supermarket.findByPk(supermarket_id);

    if(!supermarket) {
      return response.status(400).json({ error: 'Supermercado não existe' });
    }

    const product = await Product.create({
      type, 
      name, 
      price, 
      amount,
      supermarket_id: parseInt(supermarket_id),
    });

    const productImg = await ImgProduct.create({
      name: request.file.originalname,
      size: request.file.size,
      key: request.file.key,
      url: '',
      id: product.dataValues.id,
      imgproduct_id: product.dataValues.id,
    });
    
    return response.json({ product, productImg });
  },

  async delete(request, response) {
    const { supermarket_id } = request.params; 
    const { id } = request.params; 

    const supermarketExists = await Supermarket.findByPk(supermarket_id);
    const productExists = await Product.findByPk(id);

    if(!supermarketExists || !productExists) {
      return response.status(400).json({ error: 'Este supermercado ou produto não existe' });
    }

    await Product.destroy({
      where: {
        id,
        supermarket_id
      }
    }).then(() => {
      return response.json({ sucess: 'Produto deletado' });
    }).catch(err => {
      return response.json({ error: 'Este produto não pode ser deletado, pois este supermercado não tem este produto em lista' });
    });

    await ImgProduct.destroy({
      where: {
        imgproduct_id: id,
        id: supermarket_id
      }
    });
  },

  async update(request, response) {
    const { supermarket_id } = request.params;
    const { id } = request.params;
    const { type, name, price, amount } = request.body;

    const supermarketExists = await Supermarket.findByPk(supermarket_id);
    const productExists = await Product.findByPk(id);

    if(!supermarketExists || !productExists) {
      return response.status(400).json({ error: 'Este supermercado ou produto não existe' });
    }

    const product = await Product.update({
      type, 
      name, 
      price, 
      amount,
      supermarket_id
    }, {
      where: { id, supermarket_id }
    }).then(() => {
      return response.json({ sucess: 'Produto atualizado' });  
    }).catch(err => {
      return response.json({ error: 'Error ao atualizar produto' });
    }); 
  }
}