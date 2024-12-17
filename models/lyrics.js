const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconfig');
const { User, Subuser } = require('.models');

// Define the Lyrics model
const Lyrics = sequelize.define('Lyrics', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    userType: {
        type: DataTypes.ENUM('User', 'Subuser'), 
        allowNull: false
    },
    quota: {
        type: DataTypes.INTEGER,
        allowNull: false,
     },
    isDeleted:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'lyrics'
});

// Define associations
User.hasMany(Lyrics, { foreignKey: 'userId', constraints: false, scope: { userType: 'User' } });
Subuser.hasMany(Lyrics, { foreignKey: 'userId', constraints: false, scope: { userType: 'Subuser' } });

Lyrics.belongsTo(User, { foreignKey: 'userId', constraints: false, scope: { userType: 'User' } });
Lyrics.belongsTo(Subuser, { foreignKey: 'userId', constraints: false, scope: { userType: 'Subuser' } });


// sequelize.sync({ alter: true }); // Ensure table changes are applied

module.exports = Lyrics;
