import { Model, DataTypes } from "sequelize";

export default class Contact extends Model {
  static init(sequelize) {
    super.init(
      {
        number_phone: {
          type: DataTypes.STRING(11),
          allowNull: false,
          unique: {
            msg: "Numero de telefone já está vinculado a outro cliente."
          },
          validate: {
            len: {
              args: [11, 11],
              msg: "Campo telefone deve conter 11 caracteres."
            },
            isNumeric: {
              msg: "Campo telefone não pode ter letras e nem traços."
            }
          },
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: true,
          unique: {
            msg: "E-mail já está vinculado a outro cliente."
          },
          validate: {
            isEmail: {
              msg: "E-mail inválido"
            }
          },
        },
      }, {
        sequelize,
        modelName: 'Contact',
        tableName: 'contacts'
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, { foreignKey: 'id', as: 'customers' });
  }
}
