import Address from "../models/Address";
import Customer from "../models/Customer";
import removeNull from "../utils/removeNull";

class AddressController {
  async index(req, res) {
    try {
      // Verificar se o cliente realmente existe
      const { idCustomer } = req.params;
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe"] })
      }

      // Procurar enredeços atrelados a ele
      const addresses = await Address.findAll({
        attributes: ["id", "zip_code", "street", "neighborhood", "city", "state", "house_number", "complement"],
        where: { id_customer: idCustomer }
      });

      // Caso nenhum endereço seja encontrado
      if (addresses.length === 0) {
        return res.status(400).json({ message: "Nenhum endereço foi localizado" });
      }

      // Filtrar o endereço para evitar campos nulos
      const filterAddress = removeNull(addresses);

      return res.status(200).json(filterAddress);
    } catch (e) {
      return res.status(404).json({ errors: e.errors.map(err => err.message) });
    }
  }

  async show(req, res) {
    try {
      // Verificar se o cliente realmente existe
      const { idCustomer, zipCode } = req.params;
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe"] })
      }

      // Procurar endereço pelo cep enviado
      const addresses = await Address.findAll({
        attributes: ["id", "zip_code", "street", "neighborhood", "city", "state", "house_number", "complement"],
        where: { id_customer: idCustomer, zip_code: zipCode }
      });

      if (addresses.length === 0) {
        return res.status(400).json({ errors: ["Endereço não encontrado."] });
      }

      // Tirar o complemento, caso o endereço se tratar de uma casa
      const filterAddress = removeNull(addresses);

      return res.status(200).json(filterAddress);
    } catch (e) {
      return res.status(404).json({ errors: e.errors.map(err => err.message) });
    }
  }

  async store(req, res) {
    try {
      // Verificar se o cliente realmente existe
      const { idCustomer } = req.params;
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe"] })
      }
      // Desestruturação de todos os campos necessários para criar o endereço
      const { zip_code, street, neighborhood, city, state, house_number, complement } = req.body;

      const address = await Address.create({ zip_code, street, neighborhood, city, state, house_number, complement, id_customer: idCustomer });

      return res.status(200).json({
        message: "Endereço cadastrado com sucesso!",
        address: address
      });
    } catch (e) {
      // Caso o endereço novo seja igual a algum endereço já vinculado no cliente
      if (e.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ errors: [`O cliente já possui esse endereço`] })
      }
      return res.status(404).json({ errors: e.errors.map(err => err.message) });
    }
  }

  async update(req, res) {
    try {
      // Verificar se o cliente realmente existe
      const { idCustomer, idAddress } = req.params;
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe"] })
      }

      // Procurar endereço pelo id do endereço
      const address = await Address.findOne({
        attributes: ["id", "zip_code", "street", "neighborhood", "city", "state", "house_number", "complement"],
        where: { id: idAddress },
        where: { id_customer: idCustomer }
      });

      // Caso não existir o endereço específico
      if (address.length === 0) {
        return res.status(400).json({ errors: ["Endereço não encontrado."] });
      }

      const addressUpdate = await address.update(req.body, {
        where: { id_customer: idCustomer } }
      );

      return res.status(200).json({ msg: "Endereço Atualizado com Sucesso.", address: addressUpdate})
    } catch (e) {
      console.error(e);
      return res.status(404).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async delete(req, res) {
    try {
      // Verificar se o cliente realmente existe
      const { idCustomer, idAddress } = req.params;
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe"] })
      }

      // Antes de efetuar o delete, é necessário saber se o cliente possui somente um endereço
      const addresses = await Address.findAll({ where: { id_customer: idCustomer } });

      if (addresses.length === 1) {
        return res.status(400).json({ errors: ["Não é possível excluir o único endereço de um cliente."] })
      }

      // Procurar endereço pelo id do endereço
      const address = await Address.findByPk(idAddress, {
        attributes: ["id", "zip_code", "street", "neighborhood", "city", "state", "house_number", "complement"],
        where: { id_customer: idCustomer }
      });

      if (!address) {
        return res.status(400).json({ errors: ["O endereço não foi encontrado."] });
      }

      // Excluir endereço
      await address.destroy();

      return res.status(200).json({ msg: "O endereço foi apagado com sucesso." });
    } catch (e) {
      console.error(e)
      return res.status(404).json({
        errors: e.erros.map(err => err.message)
      })
    }
  }
}

export default new AddressController();
