import { Model, Sequelize } from "sequelize";

export default class AddressModel extends Model {
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
          allowNull: true,
        },
        state: {
          type: Sequelize.STRING(2),
          allowNull: true,
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
          type: Sequelize.STRING(8),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'addresses'
      }
    );
    return this
  }

  static associate(models) {
    this.belongsTo(models.CustomerModel, { foreignKey: 'id_customer', as: 'customers' });
  }
}
