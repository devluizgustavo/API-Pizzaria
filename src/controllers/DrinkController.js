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
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const drink = await Drink.findOne({ where: { id: id }, attributes: ["id", "drink_name", "price", "stock_qnt"] });

      if (!drink) {
        return res.status(400).json({ errors: ["A bebida não existe."] });
      }

      return res.status(200).json(drink);
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async store(req, res) {
    const { drink_name="", price="", stock_qnt="" } = req.body;
    try {
      if (!drink_name || !price || !stock_qnt) {
        return res.status(400).json({ errors: ["Os dados não foram enviados."] });
      }

      await Drink.create({ drink_name, price, stock_qnt });

      return res.status(200).json({ msg: "A bebida foi criada com sucesso!" });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }


  async update(req, res) {
    const { id } = req.params;
    const { price, stock_qnt } = req.body;

    try {
      const drink = await Drink.findOne({
        where: { id },
        attributes: ["id", "drink_name","price", "stock_qnt"],
      });

      if (!drink) {
        return res.status(400).json({ errors: ["A bebida não existe."] });
      }
      
      await drink.update({ price: price, stock_qnt: parseInt(drink.stock_qnt) + parseInt(stock_qnt) });

      return res.status(200).json({ msg: "Bebida atualizada com sucesso!" });
    } catch(e) {
      console.log(e);
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const drink = await Drink.findOne({ where: { id: id } });

      if (!drink) {
        return res.status(400).json({ errors: ["A bebida não existe."] });
      }

      await drink.destroy();

      return res.status(200).json({ msg: "Bebida deletada com sucesso." });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }
}

export default new DrinkController();
