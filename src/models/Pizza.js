import { Model, DataTypes } from 'sequelize'

export default class Pizza extends Model {
  static init(sequelize) {
    super.init(
      {
        pizza_name: {
          type: DataTypes.STRING(45),
          allowNull: false,
          unique: {
            msg: "Já existe uma pizza com esse nome."
          },
          validate: {
            notNull: {
              msg: "O campo nome da pizza é obrigatório.",
            },
            is: {
              args: /^[A-Za-zÀ-ÿ\s]+$/i,
              msg: "O campo nome da pizza deve conter apenas letras."
            }
          }
        },
        size: {
          type: DataTypes.STRING(30),
          allowNull: false,
          validate: {
            notNull: {
              msg: "A pizza precisa ter um tamanho."
            },
            is: {
              args: /^[A-Za-zÀ-ÿ\s]+$/i,
              msg: "O campo tamanho deve conter apenas letras Ex: (Média, Pequena, Grande)."
            }
          }
        },
        description: {
          type: DataTypes.STRING(150),
          allowNull: false,
          validate: {
            notNull: {
              msg: "A descrição da pizza é obrigatório."
            },
            is: {
              args:  /^[A-Za-zÀ-ÿ\s.,]+$/i,
              msg: "O campo descrição deve conter apenas letras."
            }
          }
        },
        price: {
          type: DataTypes.DECIMAL(7, 2),
          allowNull: false,
          validate: {
            notNull: {
              msg: "O campo preço é obrigatório."
            },
            isNumeric: {
              msg: "O campo preço deve conter somente números."
            }
          }
        }
      },{
        sequelize,
        tableName: "pizzas",
        modelName: "Pizza"
      }
    );
    return this;
  }

  // static associate(models) {
  // }
}
