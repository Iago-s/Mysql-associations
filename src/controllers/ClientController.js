const Client = require('../models/Client');

module.exports = {
  async index(request, response) {
    const clients = await Client.findAll();

    return response.json(clients);
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

    const client = await Client.create({
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

    return response.json(client);
  },

  async delete(request, response) {
    const { id } = request.params;

    const clientExists = await Client.findByPk(id);

    if(!clientExists) {
      return response.status(400).json({ error: 'Este usuario não pode ser deletado pois não existe.' });
    }

    await Client.destroy({
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

    const clientExists = await Client.findByPk(id);

    if(!clientExists) {
      return response.status(400).json({ error: 'Este usuario não pode ser atualizado pois não existe.' });
    }

    const client = await Client.update({
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
      console.log('Sucesso', result);
    }).catch(err => {
      console.log('Error', err);
    });

    return response.json(client);
  }
}