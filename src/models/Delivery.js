import { Model, DataTypes } from 'sequelize'
import formatDate from '../utils/formateDate';

export default class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "Em rota",
          validate: {
            is: {
              args: /^[A-Za-zÀ-ÿ\s]+$/i,
              msg: "O campo status deve conter apenas letras Ex: (A caminho, Entregue, Cancelado)."
            },
            notNull: {
              msg: "O campo status não pode ser nulo"
            }
          }
        },
        delivery_forecast: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "30 Minutos",
          validate: {
            is: {
              args: /^[A-Za-zÀ-ÿ0-9\s]+$/i,
              msg: "O campo tempo de entrega deve conter apenas letras Ex: (45 Minutos, 1 Hora)."
            },
            notNull: {
              msg: "O campo tempo de entrega não pode ser nulo"
            }
        },
      },
      dt_delivery: {
        type: DataTypes.TEXT,
        defaultValue: formatDate(),
        allowNull: false,
      }
      },{
        sequelize,
        tableName: "delivery",
        modelName: "Delivery"
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'id_order', as: 'orders'});
  }
}
