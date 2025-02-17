import Customer from '../models/Customer.js';
import Address from '../models/Address.js';
import Contact from '../models/Contact.js';
import { Sequelize } from 'sequelize';

import database from '../config/database.js';

class CustomerController {
  async index(req, res) {
    try {
      const customers = await Customer.findAll({
        attributes: ["id","cpf","name","lastname"],
        include: [
          {
            model: Contact,
            attributes: ["number_phone", "email"]
          },
          {
            model: Address,
            attributes: ["zip_code","street","neighborhood","city","state","house_number","complement"]
          }
        ]
      });

      if (!customers) {
        return res.status(400).json({ errors: ["Nenhum cliente foi encontrado"] });
      }

      return res.status(200).json({ customers });
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const customer = await Customer.findByPk(id,{
        attributes: ["id", "name", "lastname", "cpf"],
        include: [
          {
            model: Address,
            attributes: ["zip_code","street","neighborhood","city","state","house_number","complement"]
          }
        ]
      });

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não foi encontrado."] });
      }

      return res.status(200).json(customer);
    } catch(e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }

  async store(req, res) {
    // Pegar os dados do cliente na requisição
    const { cpf="", name="", lastname, contactList, addressList } = req.body;
    const userFromTokenID = req.id_user;

    // Instanciar o Sequelize
    const sequelize = new Sequelize(database);
    const transaction = await sequelize.transaction();

    try {
      // Caso dados pessoais do cliente não sejam enviados
      if (!contactList || contactList.length === 0) {
        return res.status(400).json({ errors: ["É necessário que haja ao menos 1 telefone para contato.", "É necessário que ao menos um endereço seja cadastrado."] });
      }
      if (!addressList || addressList.length === 0) {
        return res.status(400).json({ errors: ["O cliente precisa ter ao menos um endereço cadastrado."] });
      }

      // Caso não houver nenhum erro, crie o cliente
      const customer = await Customer.create({ cpf, name, lastname, id_user: userFromTokenID }, { transaction }); // Cliente

      // Conferir se o cliente já existe
      const clientExists = await Customer.findOne({ where: { cpf: cpf } });

      if (clientExists) {
        return res.status(400).json({ errors: ["O CPF já está vinculado a outro cadastro."] })
      }

      const contact = await Contact.create({ ...contactList, id_customer: customer.id }, { transaction }); // Contatos

      const address = await Address.create({ ...addressList, id_customer: customer.id }, { transaction }); // Endereço

      if (!contact || !address) {
        // Caso haja algum erro com os dados enviados em contato ou endereço, faça o rollback na transação
        await transaction.rollback();
        // Mostrar erro
        return res.status(400).json({ errors: ["Numero de contato e endereço PRECISAM ser preenchidos corretamente."] })
      }

      // Fazer commit da transação se caso der tudo certo
      await transaction.commit();

      // Retornar sucesso
      return res.status(200).json({ msg: ["Cliente cadastrado com sucesso"] });
    } catch (e) {
      // Se algo der errado, fazemos um rollback na transação
      await transaction.rollback();

      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }

  async update(req, res) {
    try {
      // Pegar o ID enviado na requisição
      const { id } = req.params;

      // Procurar o cliente
      const customer = await Customer.findByPk(id, {
        attributes: ["id", "cpf", "name", "lastname"]
      });

      if (!customer) {
        return res.status(400).json({
          errors: ["O cliente não existe."]
        });
      }

      // Atualizar os dados e mandar pra variável
      const customerUpdate = await customer.update(req.body);

      return res.status(200).json({ msg: "Dados Atualizados com Sucesso.", customerUpdate})
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const customer = await Customer.findByPk(id);

      if (!customer) {
        return res.status(400).json({
          errors: ["Cliente não existe"]
        });
      }

      await customer.destroy();

      return res.status(200).json({
        msg: "Cliente deletado com sucesso."
      });
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });  
    }
  }
}

export default new CustomerController();
