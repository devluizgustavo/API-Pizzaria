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
