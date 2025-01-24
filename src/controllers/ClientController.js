import ClientModel from '../models/ClientModel.js';

class ClientController {
  async index(req, res) {
    try {
      const clients = await ClientModel.findAll();

      if (clients === null || clients === '') {
        return res.status(400).json({
          message: "Nenhum cliente foi encontrado."
        })
      }

      return res.status(200).json(clients);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID não enviado']
        });
      }

      const client = await ClientModel.findByPk(id);

      if (!client) {
        return res.status(400).json({
          errors: ['Cliente não existe']
        })
      }

      return res.status(200).json(client);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

  async store(req, res) {
    try {
      const client = await ClientModel.create(req.body);

      return res.status(200).json({
        message: "Cliente cadastrado com sucesso!",
        client: client
      })
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      console.log(id);

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"]
        });
      }

      const client = await ClientModel.findByPk(id);

      if (!client) {
        return res.status(400).json({
          errors: ["Cliente não existe"]
        });
      }

      const clientUpdated = await client.update(req.body);

      return res.status(200).json({
        message: "Os dados do cliente foram atualizados",
        client: clientUpdated
      });
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"]
        });
      }

      const client = await ClientModel.findByPk(id);

      if (!client) {
        return res.status(400).json({
          errors: ["Cliente não existe"]
        });
      }

      await client.destroy();
      return res.status(200).json({message:"Cliente deletado com sucesso!"});
    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
}

export default new ClientController();
