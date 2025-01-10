const sql = require('mssql')
require("dotenv").config();

const dbSettings = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

async function mssql() {
  try {
    const pool = await sql.connect(dbSettings);
    console.log(`CONECTADO A LA BASES DE DATOS [${process.env.DB_NAME}], MOTOR: [${process.env.DB_ENGINE}], AMBIENTE: [${process.env.NODE_ENV}]`);
    return pool;
  } catch (err) {
    console.error('No se pudo conectar con la Bases de Datos:', err);
    return false;
  }
}

module.exports = mssql();