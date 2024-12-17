const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/dbconfig');
const Admin = require('./admin')
 
const User = sequelize.define('User', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user' // Use defaultValue instead of default
    },
    quota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50
    }, 
    isDeleted:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    tableName: 'user'
});

// // Define association
Admin.hasMany(User, { foreignKey: 'createdBy' });
User.belongsTo(Admin, { foreignKey: 'createdBy' });

module.exports = User;
