import { Model, DataTypes } from 'sequelize';

export default class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        dt_order: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING(45),
          defaultValue: "Em andamento",
          allowNull: true,
        },
        payment_method: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Defina a forma de pagamento."
            }
          }
        },
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
    this.hasMany(models.OrderDrink, { foreignKey: 'id_order' });
    this.hasMany(models.OrderPizza, { foreignKey: 'id_order' });
  }
}
