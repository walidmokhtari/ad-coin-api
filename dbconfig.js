const mysql = require('mysql')
require("dotenv").config();

//Configuration des paramétres nécessaires pour la connexion vers ma base de données
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME
})


module.exports = pool;