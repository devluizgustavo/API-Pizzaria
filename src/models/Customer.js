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
            len: {
              args: [11, 11],
              msg: "Campo CPF deve ter 11 caracteres",
            },
            isNumeric: {
              msg: "O campo CPF deve conter apenas números."
            }
          }
        },
        name: {
          type: DataTypes.STRING(45),
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Campo Nome não pode estar vazio"
            },
            is: {
              args: /^[A-Za-zÀ-ÿ\s]+$/i,
              msg: "O campo nome deve conter apenas letras."
            }
          }
        },
        lastname: {
          type: DataTypes.STRING(45),
          allowNull: true,
          is: {
            args: /^[A-Za-zÀ-ÿ\s]+$/i,
            msg: "O campo sobrenome deve conter apenas letras."
          }
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
    this.hasMany(models.Order, { foreignKey: 'id_customer' })
    this.belongsTo(models.User, { foreignKey: 'id', as: 'users' });
  }
}
