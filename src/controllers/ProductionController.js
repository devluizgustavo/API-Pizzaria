
import Order from "../models/Order";
import Production from "../models/Production";
import OrderPizza from "../models/OrderPizza";
import OrderDrink from '../models/OrderDrink';

class ProductionController {
  async index(req, res) {
    try {
      // Mostrar produção do pedido, mostrar dados do pedido, e mostrar os produtos que estão sendo preparados.
      const productions = await Production.findAll({
        attributes: ["id", "status", "estimed_time", "dt_production"],
        include: [
          {
            model: OrderPizza,
            as: 'orders-by-pizzas',
            required: true,
            attributes: ["id_order", "pizza_name", "quantity"]
          },
          {
            model: OrderDrink,
            as: 'orders-by-drinks',
            required: false,
            attributes: ["id_order", "drink_name", "quantity"]
          }
        ]
      })

      if (!productions || productions.length === 0) {
        return res.status(400).json({ errors: ["Nenhum pedido está em produção."] });
      }

      return res.status(200).json({ productions });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async show(req, res) {
    const { idOrder } = req.params;

    try {
      const order = await Order.findByPk(idOrder);

      if (!order) {
        return res.status(400).json({ errors: ["O pedido não existe."] });
      }

      const production = await Production.findByPk(order.production_id, {
        attributes: ["id", "status", "estimed_time", "dt_production"]
      });

      if (!production) {
        return res.status(400).json({ errors: ["O pedido ainda não entrou em produção."] })
      }

      return res.status(200).json(production);
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async store(req, res) {
    const { idOrder } = req.params;

    try {
      const order = await Order.findByPk(idOrder);

      if (!order) {
        return res.status(400).json({ errors: ["O pedido não existe."] });
      }

      // Puxar todas as saidas de pizza pelo id do pedido
      const orderPizza = await OrderPizza.findAll({ where: { id_order: idOrder } });
      // Puxar todas as saídas de bebidas pelo id do pedido
      const orderDrink = await OrderDrink.findAll({ where: { id_order: idOrder } });

      // Antes de criar a produção, é preciso checar se o pedido já não está sendo preparado.
      if (order.status.toLowerCase() === "preparando" || order.production_id !== null) {
        return res.status(400).json({ errors: ["O pedido já está sendo preparado."] });
      }

      // Criar produção
      const production = await Production.create();

      // Assim que a produção for criada, é necessário mudar o status do pedido para "Preparando"
      await order.update({ production_id: production.id, status: production.status });

      // Iterar sobre saidas das pizzas, e adicionar o id da produção em cada uma delas
      for(let key of orderPizza) {
        await key.update({ production_id: production.id });
      }

      // Verificar se bebidas foram encontradas no pedido
      if (orderDrink || orderDrink.length > 0) {
        // Caso exista, fazer iteração e adicionar o ID da produção em todas as saídas
          for(let key of orderDrink) {
            await key.update({ production_id: production.id });
          }
      }

      return res.status(200).json({ msg: "Produção criada com sucesso!" });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async update(req, res) {
    // Permitir apenas o status e o tempo da produção
    const { status, estimed_time } = req.body;
    const { idOrder } = req.params;

    try {
      const order = await Order.findByPk(idOrder);

      if (!order) {
        return res.status(400).json({ errors: ["O pedido não existe."] });
      }

      if (order.status.toLowerCase() === 'finalizado') {
        return res.status(400).json({ errors: ["O pedido já foi finalizado."] })
      }

      if (order.status.toLowerCase() !== 'preparando' || order.production_id === null) {
        return res.status(400).json({ errors: ["O pedido ainda não entrou em produção."] });
      }

      const production = await Production.findByPk(order.production_id, { attributes: ["id", "status", "estimed_time", "dt_production"] });

      await production.update({ status: status, estimed_time: estimed_time });

      if (status.toLowerCase() === 'cancelado' || status.toLowerCase() === 'finalizado') {
        await order.update({ status: status });
      }

      return res.status(200).json({ msg: "Produção atualizada com sucesso!" });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }
}

export default new ProductionController();
