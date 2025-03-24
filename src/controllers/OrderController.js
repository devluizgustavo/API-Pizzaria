import Order from "../models/Order";
import OrderPizza from "../models/OrderPizza";
import OrderDrink from "../models/OrderDrink";
import Drink from '../models/Drink';
import Pizza from '../models/Pizza';
import Customer from "../models/Customer";

import { Sequelize } from "sequelize";
import database from "../config/database";

class OrderController {
  async index(req, res) {
    try {
      const orders = await Order.findAll({
        attributes: ["id", "id_customer", "dt_order", "status", "payment_method", "order_price"],
        include: [
          {
            model: OrderPizza,
            required: true,
            attributes: ["id", "pizza_name", "quantity"]
          },
          {
            model: OrderDrink,
            required: false,
            attributes: ["id", "drink_name", "quantity"]
          }
        ]
      });

      if (!orders || orders.length === 0) {
        return res.status(400).json({ errors: ["Nenhum pedido foi encontrado."] });
      }

      return res.status(200).json({ orders });
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async show(req, res) {
    const { idOrder } = req.params;

    try {
      const order = await Order.findByPk(idOrder, {
        attributes: ["id", "dt_order", "status", "payment_method", "order_price"],
        include: [
          {
            model: OrderPizza,
            required: true,
            attributes: ["id", "pizza_name", "quantity"]
          },
          {
            model: OrderDrink,
            required: false,
            attributes: ["id", "drink_name", "quantity"]
          }
        ]
      });

      if (!order) {
        return res.status(400).json({ errors: ["O pedido não existe."] });
      }

      return res.status(200).json(order);
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async store(req, res) {
    const { idCustomer } = req.params;
    const { pizzas, drinks = "", payment_method } = req.body;

    const sequelize = new Sequelize(database);
    const transaction = await sequelize.transaction();

    try {
      const prices = [];
      // Verificar se o cliente existe
      const customer = await Customer.findByPk(idCustomer);

      if (!customer) {
        return res.status(400).json({ errors: ["O cliente não existe."] });
      }

      if (!pizzas || pizzas.length === 0) {
        return res.status(400).json({ errors: ["A escolha da pizza é obrigatória."] });
      }

      // Criar pedido
      const order = await Order.create({ payment_method, id_customer: idCustomer }, { transaction });

      // Desestruturar dados de order
      const { id } = order;

      // Iterar sobre array de pizzas e criar uma a uma
      for (let pizzaObj of pizzas) {
        // Criar saída das pizzas
        let pizzaName = pizzaObj.pizza_name;
        let quantityPizza = pizzaObj.quantity;
        let idOrder = id

        const pizza = await Pizza.findOne({ where: { pizza_name: pizzaName } },);

        if (!pizza) {
          return res.status(400).json({ errors: ["Uma ou mais pizzas informadas não existem em nosso cardápio. Por favor, confira o nome das pizzas e tente novamente."] })
        }

        // Enviar o preço e a quantidade para o array do preço do pedido
        prices.push(parseFloat(pizza.price) * quantityPizza);

        await OrderPizza.create({
          pizza_name: pizzaName,
          quantity: quantityPizza,
          id_order: idOrder
        }, { transaction })
      }

      // Verificar se drinks foi enviado
      if (drinks) {
        // Caso for enviado, criar a saída do drink

        // Iterar sobre drinks
        for (let drinkObj of drinks) {
          let drinkName = drinkObj.drink_name;
          let quantityDrink = drinkObj.quantity;
          let idOrder = id;

          // Fazer a checagem se a bebida tem em estoque
          const drink = await Drink.findOne({ where: { drink_name: drinkName } }, { transaction });

          if (!drink) {
            return res.status(400).json({ errors: ["Uma ou mais bebidas informadas não existem em nosso cardápio. Por favor, confira o nome das bebidas e tente novamente."] });
          }

          // Enviar o preço para o array do preço do pedido
          prices.push(parseFloat(drink.price) * quantityDrink);

          // Desestruturação da bebida
          const { stock_qnt } = drink

          if (parseInt(stock_qnt) === 0) {
            return res.status(400).json({ errors: ["O estoque da bebida esgotou. Por favor, escolha outra bebida."] });
          }

          // Criar saida da bebida
          await OrderDrink.create({
            drink_name: drinkName,
            quantity: quantityDrink,
            id_order: idOrder,
          }, { transaction });

          // A bebida tem estoque, então a cada saída, precisamos reduzir o estoque
          // de acordo com a quantidade.

          // Novo valor do estoque
          let stockDrinkNow = parseInt(stock_qnt) - parseInt(quantityDrink);

          // Atualizar estoque
          await drink.update({ stock_qnt: stockDrinkNow }, { transaction });
        }
      }

      // Fazer um reduce nos preços para gerar o valor total do pedido
      const orderPrice = prices.reduce((val, ac) => {
        ac += val
        return ac;
      }, 0);

      // Atualizar o preço do pedido
      await order.update({ order_price: orderPrice }, { transaction });

      await transaction.commit();

      return res.status(200).json({ msg: "Pedido criado com sucesso!", idPedido: order.id });
    } catch (e) {
      await transaction.rollback();

      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async delete(req, res) {
    const { idOrder } = req.params;

    const sequelize = new Sequelize(database);
    const transaction = await sequelize.transaction();

    try {
      const order = await Order.findByPk(idOrder, { transaction });

      if (!order) {
        return res.status(400).json({ errors: ["O pedido não existe."] });
      }

      // Caso o pedido exista, verificar o status. Se o pedido em preparo, não permitir exclusão
      if ((order.status.toLowerCase()) === "preparando") {
        return res.status(400).json({ errors: ["Este pedido está sendo preparado e não pode ser excluído."] });
      } else if((order.status.toLowerCase()) === "em rota") {
        return res.status(400).json({ errors: ["Este pedido está em rota e não pode ser excluído."] });
      }

      // Verificar se o cliente pediu bebidas nesse pedido
      const leavingDrinks = await OrderDrink.findAll({ where: { id_order: order.id } }, transaction);

      // Caso tenha saida de bebidas pelo ID do pedido, adicionar a quantidade de bebidas que saiu, e atribuir ao estoque atual
      if (leavingDrinks && leavingDrinks.length > 0) {

        // Iterar sobre as bebidas
        for (let drinkObj of leavingDrinks) {
          let drinkNameChosen = drinkObj.drink_name;
          let drinkQntChosen = parseFloat(drinkObj.quantity);
          let currentStock, result = null;

          // Procurar bebida
          const drink = await Drink.findByPk(drinkNameChosen);

          currentStock = parseFloat(drink.stock_qnt);
          result = currentStock + drinkQntChosen;

          await drink.update({ stock_qnt: result }, transaction);
        }
      }

      await order.destroy();

      return res.status(200).json({ msg: "Pedido deletado com sucesso!" });
    } catch (e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }
}

export default new OrderController();
