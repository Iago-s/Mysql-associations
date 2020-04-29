const Client = require('../models/Client');
const ImgClient = require('../models/Imgclient');

module.exports = {
  async indexAll(request, response) {
    const clients = await Client.findAll();

    return response.json(clients);
  },

  async index(request, response) {
    const { client_id } = request.params;

    const imgClients = await Client.findByPk(client_id, {
      include: { association: 'imgclient' }
    });

    if(!imgClients) {
      return response.status(400).json({ error: 'Cliente não existe' });
    }

    return response.json(imgClients);
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

    if(request.file === undefined) {
      return response.json({ client });
    }
    
    const imgClient = await ImgClient.create({
      name: request.file.originalname,
      size: request.file.size,
      key: request.file.key,
      url: '',
      client_id: client.dataValues.id 
    });
     
    return response.json({ client, imgClient });
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

    await ImgClient.destroy({
      where: {
        client_id: id
      }
    });

    return response.json({ sucess: 'Cliente apagado' });
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