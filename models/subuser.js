const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { sequelize } = require('../config/dbcconfig');
const User = require('./user')
 
const Subuser = sequelize.define('Subuser', {
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
        defaultValue: 'sub_user'
      },
    quota: {
        type: DataTypes.INTEGER,
        allowNull: false, 
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
},{
    tableName: 'sub_user'
})

// Define association
User.hasMany(Subuser, { foreignKey: 'createdBy' }); // Establish association with Subuser model
Subuser.belongsTo(User, {foreignKey: "createdBy" })

// sequelize.sync({ alter: true });

module.exports = Subuser;