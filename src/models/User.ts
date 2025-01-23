import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcryptjs';

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value: string) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      }
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
);

export default User;