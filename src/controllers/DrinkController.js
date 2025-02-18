import Drink from "../models/Drink";

class DrinkController {
  async index(req, res) {
    try {
      const drinks = await Drink.findAll({ attributes: ["id","drink_name", "price", "stock_qnt"] });

      if (!drinks || drinks.length === 0) {
        return res.status(400).json({ errors: ["Nenhuma bebida foi encontrada."] });
      }

      return res.status(200).json(drinks);
    } catch(e) {
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

      const drink = await Drink.findByPk(id, { attributes: ["id", "drink_name", "price", "stock_qnt"] });

      if (!drink) {
        return res.status(400).json({ errors: ["A bebida não existe."] });
      }

      return res.status(200).json(drink);
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
    try {
      const { drink_name="", price="", stock_qnt="" } = req.body;

      if (!drink_name || !price || !stock_qnt) {
        return res.status(400).json({ errors: ["Os dados não foram enviados."] });
      }

      const newDrink = await Drink.create({ drink_name, price, stock_qnt });

      return res.status(200).json({ msg: "A bebida foi criada com sucesso!", drink: newDrink });
    } catch(e) {
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
      const { id } = req.params;
      const { drink_name, price, stock_qnt } = req.body;

      const drink = await Drink.findByPk(id, { attributes: ["id", "drink_name", "price", "stock_qnt"] });

      if (!drink) {
        return res.status(400).json({ errors: ["A bebida não existe."] });
      }

      const drinkAtt = await drink.update({ drink_name, price, stock_qnt })

      return res.status(200).json({ msg: "Bebida atualizada com sucesso!", drink: drinkAtt });
    } catch(e) {
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

      const drink = await Drink.findByPk(id);

      if (!drink) {
        return res.status(400).json({ errors: ["A bebida não existe."] });
      }

      await drink.destroy();

      return res.status(200).json({ msg: "Bebida deletada com sucesso." });
    } catch(e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
      // Caso de erros do servidor
      return res.status(500).json({ errors: [e.message || "Erro interno do servidor."] });
    }
  }
}

export default new DrinkController();
