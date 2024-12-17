const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/dbconfig');
 

const Admin = sequelize.define('Admin', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    }, 
    email: { // Changed from username to email
        type: DataTypes.STRING,
        allowNull: false, // Assuming email is required
        unique: true // Assuming email should be unique
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'admin'
    },
    isDeleted:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'admin'
});

module.exports = Admin;
