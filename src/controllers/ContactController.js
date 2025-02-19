import Contact from "../models/Contact";
import Customer from "../models/Customer";

class ContactController {
  async index(req, res) {
    try {
      const { idCustomer } = req.params;

      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      const contacts = await Contact.findAll({ attributes: ["id", "number_phone", "email"] });

      if (!contacts || contacts.length === 0) {
        return res.status(400).json({ errors: ["Não existe contatos vinculados a esse cliente."] });
      }

      return res.status(200).json(contacts);
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
      // Caso de erros do servidor
      return res.status(500).json({ errors: ["Erro interno do servidor."] });
    }
  }

  async show(req, res) {
    try {
      const { idCustomer, idContact } = req.params;

      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      const contact = await Contact.findByPk(idContact, { attributes: ["id", "number_phone", "email"] });

      if (!contact) {
        return res.status(400).json({ errors: "O contato não existe." });
      }

      return res.status(200).json(contact)
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
      // Caso de erros do servidor
      return res.status(500).json({ errors: ["Erro interno do servidor."] });
    }
  }

  async store(req, res) {
    try {
      const { idCustomer } = req.params;
      const { number_phone = "", email } = req.body;

      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      if (!number_phone) {
        return res.status(400).json({ errors: ["O cliente precisa ter ao menos um número de telefone obrigatório."] });
      }

      const newContact = await Contact.create({ number_phone, email, id_customer: idCustomer });

      return res.status(200).json({
        msg: "Contato criado com sucesso.",
        contact: {
          id: newContact.id,
          number_phone: newContact.number_phone,
          email: newContact.email
        }
      });
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
      // Caso de erros do servidor
      return res.status(500).json({ errors: ["Erro interno do servidor."] });
    }
  }

  async update(req, res) {
    try {
      const { idCustomer, idContact } = req.params;
      const { number_phone, email } = req.body;

      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      const contact = await Contact.findByPk(idContact, { attributes: ["id", "number_phone", "email"] });

      if (!contact) {
        return res.status(400).json({ errors: ["O contato não existe."] });
      }

      const contactAtt = await contact.update({ number_phone, email });

      return res.status(200).json({ msg: "O contato foi atualizado com sucesso.", contact: contactAtt });
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso de erros do servidor
      console.error(e);
      return res.status(500).json({ errors: ["Erro interno do servidor."] });
    }
  }

  async delete(req, res) {
    try {
      const { idCustomer, idContact } = req.params;

      const customer = await Customer.findByPk(idCustomer);

      // Caso o cliente não exista
      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      const contact = await Contact.findByPk(idContact);

      // Caso o contato não exista
      if (!contact) {
        return res.status(400).json({ errors: ["O contato não existe."] });
      }

      // Caso exista, fazer a verificação se o contato é o unico na tabela
      const contacts = await Contact.findAll({ where: { id_customer: idCustomer } });

      // Caso for, não permitir a exclusão.
      if (contacts.length === 1) {
        return res.status(400).json({ errors: ["Não é possível deletar o único contato do cliente."] });
      }

      await contact.destroy();

      return res.status(200).json({ msg: "O contato foi deletado com sucesso!" });
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
      // Caso de erros do servidor
      return res.status(500).json({ errors: ["Erro interno do servidor."] });
    }
  }
}

export default new ContactController();
