const Supermarket = require('../models/Supermarket');

module.exports = {
  async index(request, response) {
    const supermarkets = await Supermarket.findAll();

    return response.json(supermarkets);
  },

  async store(request, response) {
    const { 
      account_type, 
      name, 
      street, 
      number,
      district, 
      complement, 
      city, 
      uf, 
      zipcode, 
      email, 
      password } = request.body;

    const supermarket = await Supermarket.create({
      account_type, 
      name, 
      street, 
      number, 
      district, 
      complement, 
      city, 
      uf, 
      zipcode, 
      email, 
      password
    });

    return response.json(supermarket);
  },
  async delete(request, response) {
    const { id } = request.params;

    const supermarketExists = await Supermarket.findByPk(id);

    if(!supermarketExists) {
      return response.status(400).json({ error: 'Este supermercado não pode ser deletado pois não existe.' });
    }

    await Supermarket.destroy({
      where: {
        id
      }
    });

    return response.json();
  },

  async update(request, response) {
    const { 
      account_type, 
      name, 
      street, 
      number, 
      district, 
      complement, 
      city, 
      uf, 
      zipcode, 
      email, 
      password
    } = request.body;

    const { id } = request.params;

    const supermarketExists = await Supermarket.findByPk(id);

    if(!supermarketExists) {
      return response.status(400).json({ error: 'Este supermercado não pode ser atualizado pois não existe.' });
    }

    const supermarket = await Supermarket.update({
      account_type, 
      name, 
      street, 
      number, 
      district, 
      complement, 
      city, 
      uf, 
      zipcode, 
      email, 
      password
    }, {
      where: { id }
    }).then(result => {
      response.json({ sucess: 'Supermercado atualizado' })
    }).catch(err => {
      response.json({ error: 'Não foi possivel atualizar os dados do supermercado.' });
    });
  }
}