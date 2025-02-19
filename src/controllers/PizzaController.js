import Pizza from "../models/Pizza";

class PizzaController {
  async index(req, res) {
    try {
      const pizzas = await Pizza.findAll({
        attributes: ["id", "pizza_name", "size", "description", "price"]
      })

      if (pizzas.length === 0) {
        return res.status(400).json({
          errors: ["Nenhuma pizza foi encontrada."]
        })
      }

      return res.status(200).json({ pizzas });
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
      const { id } = req.params;

      const pizza = await Pizza.findByPk(id, {
        attributes: ["id", "pizza_name", "size", "description", "price"]
      });

      if (!pizza) {
        return res.status(400).json({
          errors: ["A pizza não existe."]
        })
      }

      return res.status(200).json(pizza);
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
      // Pegar os dados da pizza
      const { pizza_name, size, description, price } = req.body;

      // Criar pizza
      const newPizza = await Pizza.create({ pizza_name, size, description, price });

      // Mostrar mensagem ao usuário
      return res.status(200).json({ msg: "A pizza foi criada com sucesso!", pizza: newPizza });
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
      const { id } = req.params;
      const { pizza_name, size, description, price } = req.body;

      // Buscar a pizza pelo ID
      const pizza = await Pizza.findByPk(id, {
        attributes: ["id", "pizza_name", "size", "description", "price"]
      });

      if (!pizza) {
        return res.status(400).json({ errors: ["A pizza não foi encontrada ou não existe."] });
      }

      // Atualizar a pizza
      const pizzaAtt = await pizza.update({ pizza_name, size, description, price },);

      return res.status(200).json({ msg: "A pizza foi atualizada com sucesso!", pizza: pizzaAtt });
    } catch (e) {
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
      // Caso de erros do servidor
      return res.status(500).json({ errors: ["Erro interno do servidor."] });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      // Buscar a pizza pelo ID
      const pizza = await Pizza.findByPk(id);

      if (!pizza) {
        return res.status(400).json({ errors: ["A pizza não foi encontrada ou não existe."] });
      }

      // Atualizar a pizza
      await pizza.destroy();

      return res.status(200).json({ msg: "A pizza foi deletada com sucesso!" });
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

export default new PizzaController();
