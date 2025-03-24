import { Model, DataTypes } from 'sequelize';

export default class OrderDrink extends Model {
  static init(sequelize) {
    super.init(
      {
        drink_name: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: 'drinks',
            key: 'drink_name'
          },
          validate: {
            notNull: {
              msg: "Nome da bebida não pode estar vazio."
            },
            is: {
              args: /^[A-Za-zÀ-ÿ\s-]+$/i,
              msg: "O campo nome da bebida deve conter apenas letras."
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
        tableName: "orders-by-drinks",
        modelName: "OrderDrink"
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Order, { foreignKey: 'id_order' });
    this.belongsTo(models.Drink, { foreignKey: 'drink_name' });
    this.belongsTo(models.Production, { foreignKey: 'production_id' });
  }
}
