const Supermarket = require('../models/Supermarket');
const Product = require('../models/Product');

module.exports = {
  async index(request, response) {
    const { supermarket_id } = request.params;

    const supermarket = await Supermarket.findByPk(supermarket_id, {
      include: { association: 'products'}
    });

    if(!supermarket) {
      return response.status(400).json({ error: 'Supermercado não existe' });
    }

    response.json(supermarket);
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
      supermarket_id,
    });
    
    return response.json(product);
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
    }).then(result => {
      return response.json({ sucess: 'Produto atualizado' });  
    }).catch(err => {
      return response.json({ error: 'Error ao atualizar produto' });
    }); 
  }
}