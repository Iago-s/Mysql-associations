const Supermarket = require('../models/Supermarket');
const ImgSupermarket = require('../models/Imgsupermarket');

module.exports = {
  async indexall(request, response) {
    const supermarkets = await Supermarket.findAll();

    return response.json(supermarkets);
  },

  async index(request, response) {
    const { supermarket_id } = request.params;

    const imgSupermarket = await Supermarket.findByPk(supermarket_id, {
      include: { association: 'imgsupermarket' }
    });

    if(!imgSupermarket) {
      return response.status(400).json({ error: 'Supermercado não existe' });
    }

    return response.json(imgSupermarket);
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

    if(request.file === undefined) {
      return response.json({ supermarket });
    }
    
    const imgSupermarket = await ImgSupermarket.create({
      name: request.file.originalname,
      size: request.file.size,
      key: request.file.key,
      url: '',
      imgsupermarket_id: supermarket.dataValues.id 
    });
     
    return response.json({ supermarket, imgSupermarket });
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

    await ImgSupermarket.destroy({
      where: {
        imgsupermarket_id: id
      }
    })

    return response.json({ sucess: 'Supermercado apagado' });
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