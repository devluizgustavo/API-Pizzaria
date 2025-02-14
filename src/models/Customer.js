import { Model, DataTypes } from 'sequelize'

export default class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: {
            msg: "O CPF informado já existe."
          },
          validate: {
            notEmpty: {
              msg: "Campo CPF não pode estar vazio"
            },
            len: {
              args: [11, 11],
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
        modelName: 'Customer',
        tableName: 'customers'
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'id_customer' });
    this.hasMany(models.Contact, { foreignKey: 'id_customer' });
    this.belongsTo(models.User, { foreignKey: 'id', as: 'users' });
  }
}
