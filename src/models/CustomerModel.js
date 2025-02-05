import { Model, DataTypes } from 'sequelize'

export default class ClientModel extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: {
            msg: "O CPF já está cadastrado"
          },
          validate: {
            notEmpty: {
              msg: "Campo CPF não pode estar vazio"
            },
            len: {
              args: [11],
              msg: "Campo CPF deve ter 11 caracteres",
            },
          }
        },
        name: {
          type: DataTypes.STRING(45),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Campo Nome não pode estar vazio"
            }
          }
        },
        lastname: {
          type: DataTypes.STRING(45),
          allowNull: true,
        }
      },{
        sequelize,
        modelName: 'Customers'
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.AddressModel, { foreignKey: "id_customer", as: 'addresses' });
  }
}
