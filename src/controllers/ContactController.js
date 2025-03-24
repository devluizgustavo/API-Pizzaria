import Contact from "../models/Contact";
import Customer from "../models/Customer";

class ContactController {
  async index(req, res) {
    const { idCustomer } = req.params;

    try {
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      const contacts = await Contact.findAll({
        where: { id_customer: idCustomer },
        attributes: ["id", "number_phone", "email"] }
      );

      if (!contacts || contacts.length === 0) {
        return res.status(400).json({ errors: ["Não existe contatos vinculados a esse cliente."] });
      }

      return res.status(200).json(contacts);
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async show(req, res) {
    const { idCustomer, idContact } = req.params;

    try {
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
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async store(req, res) {
    const { idCustomer } = req.params;
    const { number_phone = "", email } = req.body;

    try {
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      if (!number_phone) {
        return res.status(400).json({ errors: ["O cliente precisa ter ao menos um número de telefone obrigatório."] });
      }

      await Contact.create({ number_phone, email, id_customer: idCustomer });

      return res.status(200).json({ msg: "Contato criado com sucesso." });
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async update(req, res) {
    const { idCustomer, idContact } = req.params;
    const { number_phone, email } = req.body;

    try {
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      const contact = await Contact.findByPk(idContact, { attributes: ["id", "number_phone", "email"] });

      if (!contact) {
        return res.status(400).json({ errors: ["O contato não existe."] });
      }

      await contact.update({ number_phone, email });

      return res.status(200).json({ msg: "O contato foi atualizado com sucesso." });
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async delete(req, res) {
    const { idCustomer, idContact } = req.params;

    try {
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
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }
}

export default new ContactController();
