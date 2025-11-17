const { Sequelize } = require('sequelize');
const dotEnv = require("@dotenvx/dotenvx")
dotEnv.config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_CLIENT = process.env.DB_CLIENT;
const DB_HOST = process.env.DB_HOST;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_CLIENT,
});
console.log(sequelize)
module.exports = sequelize;