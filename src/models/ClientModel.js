import { Model, Sequelize } from 'sequelize'

export default class ClientModel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "Campo nome é obrigatório.",
            },
          },
        },
        lastname: Sequelize.STRING,
        number_phone: {
          type: Sequelize.STRING(12),
          allowNull: false,
          validate: {
            notNull: {
              msg: "É necessário ter ao menos 1 número de contato.",
            },
          },
        },
      },
      {
        sequelize,
        modelName: 'clients'
      }
    );
    return this;
  }
}
