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
            notNull: {
              msg: "Campo cep é obrigatório."
            },
            len: {
              args: [8],
              msg: "O CEP digitado é inválido."
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
          },
        },
        neighborhood: {
          type: Sequelize.STRING(80),
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo bairro é obrigatório."
            },
          },
        },
        city: {
          type: Sequelize.STRING(50),
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo cidade é obrigatório."
            }
          }
        },
        state: {
          type: Sequelize.STRING(2),
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo estado é obrigatório."
            },
            len: {
              args: [2],
              msg: "Estado deve conter somente 2 caracteres."
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
