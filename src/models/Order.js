import { Model, DataTypes } from 'sequelize';
import formatDate from '../utils/formateDate';

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        dt_order: {
          type: DataTypes.TEXT,
          defaultValue: formatDate(),
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING(45),
          defaultValue: "Em andamento",
          allowNull: false,
        },
        payment_method: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Defina a forma de pagamento."
            }
          },
        },
        order_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
          defaultValue: 0.00
        }
      }, {
        sequelize,
        tableName: "orders",
        modelName: "Order"
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'id', as: 'customers' });
    this.belongsTo(models.Production, { foreignKey: 'production_id', as: 'production' });
    this.hasMany(models.Delivery, { foreignKey: 'id_order' });
    this.hasMany(models.OrderDrink, { foreignKey: 'id_order' });
    this.hasMany(models.OrderPizza, { foreignKey: 'id_order' });
  }
}
