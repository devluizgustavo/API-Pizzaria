import { DataTypes, Model } from "sequelize";
import bcrypt from 'bcrypt';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [4, 50],
              msg: "Campo nome deve conter entre 4 a 50 caracteres."
            },
          },
        },
        login: {
          type: DataTypes.STRING,
          validate: {
            len: {
              args: [5, 15],
              msg: "Campo login deve conter entre 5 a 15 caracteres."
            },
            isAlphanumeric: {
              msg: "O login deve ser composto por letras e números."
            }
          },
          unique: {
            msg: "O login já existe."
          }
        },
        password_hash: {
          type: DataTypes.STRING,
          defaultValue: ""
        },
        password: {
          type: DataTypes.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 30],
              msg: "Campo senha deve conter entre 3 a 30 caracteres"
            },
          },
        },
        ativo: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        }
      },
      {
        tableName: 'users',
        modelName: 'User',
        sequelize,
      },
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Método auxiliar para verificar a senha
  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Customer, { foreignKey: 'id_user' });
  }
}
