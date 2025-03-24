import Pizza from "../models/Pizza";

class PizzaController {
  async index(req, res) {
    try {
      const pizzas = await Pizza.findAll({
        attributes: ["id", "pizza_name", "size", "description", "price"]
      })

      if (pizzas.length === 0) {
        return res.status(400).json({ errors: ["Nenhuma pizza foi encontrada."] })
      }

      return res.status(200).json({ pizzas });
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }
  async show(req, res) {
    const { id } = req.params;

    try {
      const pizza = await Pizza.findOne({ where: { id: id }, attributes: ["id", "pizza_name", "size", "description", "price"] });

      if (!pizza) {
        return res.status(400).json({ errors: ["A pizza não existe."] })
      }

      return res.status(200).json(pizza);
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async store(req, res) {
    const { pizza_name, size, description, price } = req.body;

    try {
      // Criar pizza
      await Pizza.create({ pizza_name, size, description, price });

      // Mostrar mensagem ao usuário
      return res.status(200).json({ msg: "A pizza foi criada com sucesso!" });
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { pizza_name, size, description, price } = req.body;

    try {
      // Buscar a pizza pelo ID
      const pizza = await Pizza.findOne({ where: { id: id }, attributes: ["id", "pizza_name", "size", "description", "price"] });

      if (!pizza) {
        return res.status(400).json({ errors: ["A pizza não foi encontrada ou não existe."] });
      }

      // Atualizar a pizza
      await pizza.update({ pizza_name, size, description, price },);

      return res.status(200).json({ msg: "A pizza foi atualizada com sucesso!" });
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      // Buscar a pizza pelo ID
      const pizza = await Pizza.findOne({ where: { id: id } });

      if (!pizza) {
        return res.status(400).json({ errors: ["A pizza não foi encontrada ou não existe."] });
      }
      // Atualizar a pizza
      await pizza.destroy();

      return res.status(200).json({ msg: "A pizza foi deletada com sucesso!" });
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }
}

export default new PizzaController();
