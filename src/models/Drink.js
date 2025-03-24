import { Model, DataTypes } from 'sequelize'

export default class Drink extends Model {
  static init(sequelize) {
    super.init(
      {
        drink_name: {
          type: DataTypes.STRING(45),
          allowNull: false,
          primaryKey: true,
          unique: {
            msg: "A bebida já existe."
          },
          validate: {
            notNull: {
              msg: "Nome da bebida não pode ser nulo."
            },
            is: {
              args: /^[A-Za-zÀ-ÿ0-9\s-]+$/i,
              msg: "O campo nome da bebida deve conter apenas letras."
            }
          },
        },
        price: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo preço não pode ser nulo."
            },
            isNumeric: {
              msg: "O campo preço deve conter apenas números."
            }
          }
        },
        stock_qnt: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Informe a quantidade que será adicionada ao estoque."
            },
            isInt: {
              msg: "O campo estoque deve conter apenas números inteiros."
            }

          }
        }
      },{
        sequelize,
        tableName: "drinks",
        modelName: "Drink"
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.OrderDrink, { foreignKey: 'drink_name' });
  }
}
