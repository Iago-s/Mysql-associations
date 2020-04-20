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
  }
}