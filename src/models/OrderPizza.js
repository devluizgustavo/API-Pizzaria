import { Model, DataTypes } from 'sequelize';

export default class OrderPizza extends Model {
  static init(sequelize) {
    super.init(
      {
        pizza_name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "O campo nome da pizza não pode estar vazio."
            }
          }
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: "O campo quantidade não pode estar vazio."
            }
          }
        },
      }, {
        sequelize,
        tableName: "orders-by-pizzas",
        modelName: "OrderPizza"
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'id_order' });
    this.belongsTo(models.Pizza, { foreignKey: 'pizza_name' });
    this.belongsTo(models.Production, { foreignKey: 'production_id' });
  }
}
