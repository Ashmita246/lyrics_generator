"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    // Method to validate password
    async validatePassword(password) {
        return bcryptjs_1.default.compare(password, this.password);
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'users'
});
exports.default = User;
