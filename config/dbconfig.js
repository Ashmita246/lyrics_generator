
const { Sequelize } = require('sequelize');
require("dotenv").config();
 
const sequelize = new Sequelize(process.env.DATABASE, 'root', process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    multipleStatements: true,
    logging: false,
 });

sequelize.authenticate()
  .then(() => {
    console.log(`Connected to the database successfully...`);
})
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports= {sequelize}