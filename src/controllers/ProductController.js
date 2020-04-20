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
  }
}