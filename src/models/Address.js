import { Model, Sequelize } from "sequelize";

export default class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        zip_code: {
          type: Sequelize.STRING(10),
          allowNull: false,
          unique: {
            msg: 'O endereço já está associado com esse usuário'
          },
          validate: {
            len: {
              args: [8, 8],
              msg: "O CEP é inválido."
            },
            isNumeric: {
              msg: "O campo CEP deve conter somente números."
            }
          },
        },
        street: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo rua é obrigatório."
            },
            is: {
              args: /^[A-Za-zÀ-ÿ\s]+$/i,
              msg: "O campo rua deve conter apenas letras."
            }
          },
        },
        neighborhood: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo bairro é obrigatório."
            },
            is: {
              args: /^[A-Za-zÀ-ÿ\s]+$/i,
              msg: "O campo bairro deve conter apenas letras."
            }
          },
        },
        city: {
          type: Sequelize.STRING(50),
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo cidade é obrigatório."
            },
            is: {
              args: /^[A-Za-zÀ-ÿ\s]+$/i,
              msg: "O campo cidade deve conter apenas letras."
            }
          }
        },
        state: {
          type: Sequelize.STRING(2),
          allowNull: false,
          validate: {
            len: {
              args: [2],
              msg: "Estado deve conter somente 2 caracteres."
            },
            is: {
              args: /^[A-Za-zÀ-ÿ\s]+$/i,
              msg: "O campo rua deve conter apenas letras."
            }
          }
        },

        house_number: {
          type: Sequelize.STRING(8),
          allowNull: false,
          validate: {
            notNull: {
              msg: "É obrigatório informar o número da casa."
            },
            isNumeric: {
              msg: "O numero da casa não pode conter letras."
            }
          },
        },
        complement: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'Address',
        tableName: 'addresses'
      }
    );
    return this
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'id', as: 'customers' });
  }
}
