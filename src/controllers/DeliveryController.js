import Delivery from "../models/Delivery";
import Order from "../models/Order";
import Address from "../models/Address";

class DeliveryController {
  async index(req, res) {
    try {
      const deliveries = await Delivery.findAll({
        attributes: ["id", "id_order", "status", "delivery_forecast", "dt_delivery"] });

      let arrayDeliveries = [];

      if (!deliveries || deliveries.length === 0) {
        return res.status(400).json({ errors: ["Nenhuma entrega foi encontrada."] });
      }

      for (let i = 0; i < deliveries.length; i++) {
        const delivery = deliveries[i];
        const order = await Order.findByPk(delivery.id_order);

        if (!order) {
          return res.status(400).json({ errors: ["A rota não está associada a nenhum pedido."] });
        }

        const address = await Address.findOne({
          where: { id_customer: order.id_customer },
          attributes: ["id", "zip_code", "street", "neighborhood", "city", "state", "house_number", "complement"]
        });

        arrayDeliveries.push([delivery, address]);
      }

      return res.status(200).json(arrayDeliveries);
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

      if (order.status.toLowerCase() === 'cancelado') {
        return res.status(400).json({ errors: ["O pedido foi cancelado."] });
      }

      if (order.status.toLowerCase() !== 'em rota') {
        return res.status(400).json({ errors: ["O pedido ainda não saiu para entrega."] });
      }

      const delivery = await Delivery.findOne({
        where: { id_order: idOrder },
        attributes: ["id", "id_order", "status", "delivery_forecast", "dt_delivery"]
       });

      if (!delivery || delivery.status.toLowerCase() === "cancelado") {
        return res.status(400).json({ errors: ["A rota de entrega não existe ou foi cancelada."] });
      }

      const address = await Address.findOne({
        where: { id_customer: order.id_customer } ,
        attributes: ["zip_code", "street", "neighborhood", "city", "state", "house_number", "complement"]
      });

      return res.status(200).json({ delivery, address });
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

      if (order.status.toLowerCase() === 'em andamento' ||
          order.status.toLowerCase() === 'preparando' && order.production_id !== null) {
        return res.status(400).json({ errors: ["O pedido ainda está em preparo e não pode ser enviado para entrega."] })
      } else if (order.status.toLowerCase() === 'cancelado') {
        return res.status(400).json({ errors: ["O pedido foi cancelado e não poderá ser enviado para entrega."] })
      } else if (order.status.toLowerCase() === 'em rota') {
        return res.status(400).json({ errors: ["O pedido já saiu para entrega."] });
      }

      const delivery = await Delivery.create({ id_order: idOrder });

      await order.update({ status: delivery.status });

      return res.status(200).json({ msg: "O pedido saiu para entrega" });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async update(req, res) {
    const { idOrder } = req.params;
    const { status, delivery_forecast } = req.body;

    try {
      const order = await Order.findByPk(idOrder);

      if (!order) {
        return res.status(400).json({ errors: ["O pedido não existe."] });
      }

      if (order.production_id === null) {
        return res.status(400).json({ errors: ["O pedido ainda não saiu para entrega."] });
      } else if (order.status.toLowerCase() === 'entregue') {
        return res.status(400).json({ errors: ["O pedido já foi entregue."] });
      }

      const delivery = await Delivery.findByPk(order.production_id, { attributes: ["id", "status", "delivery_forecast", "dt_delivery"] });

      if (!delivery) {
        return res.status(400).json({ errors: ["A entrega não foi encontrada ou foi cancelada."] })
      }

      await delivery.update({ status, delivery_forecast });

      await order.update({ status: status });

      return res.status(200).json({ msg: "O status da entrega foi atualizado com sucesso!" });
    } catch(e) {
      if (e.errors && Array.isArray(e.errors)) {
        return res.status(400).json({ errors: e.errors.map(err => err.message) });
      }
    }
  }

  async delete(req, res) {}
}

export default new DeliveryController();
