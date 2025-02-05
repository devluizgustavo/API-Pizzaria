import { Model, DataTypes } from "sequelize";

export default class ContactModel extends Model {
  static init(sequelize) {
    super.init(
      {
        number_phone: {
          type: DataTypes.STRING(11),
          allowNull: false,
          validate: {
            len: {
              args: [11],
              msg: "Campo telefone deve ter 11 caracteres."
            },
            notEmpty: {
              msg: "Campo telefone não pode estar vazio"
            }
          },
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
          validate: {
            isEmail: {
              msg: "E-mail inválido"
            }
          }
        },
      }, {
        sequelize,
        modelName: 'contacts'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.CustomerModel, { foreignKey: 'id_customer', as: 'customers' });
  }
}
