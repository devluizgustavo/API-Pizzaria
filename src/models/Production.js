import { Model, DataTypes } from "sequelize";
import formatDate from "../utils/formateDate";

export default class Production extends Model {
  static init(sequelize) {
    super.init(
      {
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "Preparando",
        },
        estimed_time: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "45 minutos",
        },
        dt_production: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
          validate: {
            notNull: {
              msg: "Data de produção não pode ser nulo."
            }
          }
        }
      }, {
        tableName: 'production',
        modelName: 'Production',
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'production_id', as: 'orders' });
    this.hasMany(models.OrderPizza, { foreignKey: 'production_id', as: 'orders-by-pizzas'});
    this.hasMany(models.OrderDrink, { foreignKey: 'production_id', as: 'orders-by-drinks'});
  }
}
