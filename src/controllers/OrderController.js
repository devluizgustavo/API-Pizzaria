import Order from "../models/Order";
import OrderPizza from "../models/OrderPizza";
import OrderDrink from "../models/OrderDrink";
import Drink from '../models/Drink';
import Customer from "../models/Customer";

import { Sequelize } from "sequelize";
import database from "../config/database";

class OrderController {
  async index(req, res) {
    res.send("Ola");
  }
  async show(req, res) { }

  async store(req, res) {
    const { idCustomer } = req.params;
    const { pizzas, drinks="", payment_method } = req.body;

    const sequelize = new Sequelize(database);
    const transaction = await sequelize.transaction();

    try {
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
      const { id, dt_order, status } = order;

      // Iterar sobre array de pizzas e criar uma a uma
      for(let pizzaObj of pizzas) {
        // Criar saída das pizzas
        let pizzaName = pizzaObj.pizza_name;
        let quantityPizza = pizzaObj.quantity;
        let idOrder = id

        await OrderPizza.create({
          pizza_name: pizzaName,
          quantity: quantityPizza,
          id_order: idOrder }, { transaction })
      }


      // Verificar se drinks foi enviado
      if (drinks) {
        // Caso for enviado, criar a saída do drink

        // Iterar sobre drinks
        for(let drinkObj of drinks) {
          let drinkName = drinkObj.drink_name;
          let quantityDrink = drinkObj.quantity;
          let idOrder = id;

          // Fazer a checagem se a bebida tem em estoque
          const drink = await Drink.findOne({ where: { drink_name: drinkName }}, { transaction });

          // Desestruturação da bebida
          const { stock_qnt } = drink

          if (parseInt(stock_qnt) === 0) {
            return res.status(400).json({ errors: ["O estoque da bebida esgotou. Por favor, escolha outra bebida."] });
          }

          // Criar saida da bebida
          await OrderDrink.create({
            drink_name: drinkName,
            quantity: quantityDrink,
            id_order: idOrder
          }, { transaction });

          // A bebida tem estoque, então a cada saída, precisamos reduzir o estoque
          // de acordo com a quantidade.

           // Novo valor do estoque
           let stockDrinkNow = parseInt(stock_qnt) - parseInt(quantityDrink);

           // Atualizar estoque
           await drink.update({ stock_qnt: stockDrinkNow }, { transaction });
        }
      }

      await transaction.commit();

      return res.status(200).json({ msg: "Pedido criado com sucesso!",
        dt_order,
        status,
        payment_method
       });
    } catch (e) {
      console.log(e);
      await transaction.rollback();
      // Caso de erros de validação
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }

      // Caso o usuário tenha digitado uma pizza que não existe
      if (e.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ errors: ["Uma ou mais pizzas informadas não existem em nosso menu. Por favor, confira o nome das pizzas e tente novamente."] });
      }

      // Caso de erros do servidor
      return res.status(500).json({ errors: ["Erro interno do servidor."] });
    }
  }

  async update(req, res) { }

  async delete(req, res) { }
}

export default new OrderController();
