const sql = require("mysql2");
const mysql = require("mysql2/promise");

require("dotenv").config();

const settings = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT
};

const connection = mysql.createPool({
... settings,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0
});

let conexion;

async function myMysql() {
  conexion = sql.createConnection(settings);

  conexion.connect((err) => {
    if (err) {
      console.log("[db err]", err);
      setTimeout(mysql, 200);
    } else {
      console.log(
        `CONECTADO A LA BASES DE DATOS [${process.env.DB_NAME}], MOTOR: [${process.env.DB_ENGINE}], AMBIENTE: [${process.env.NODE_ENV}]`
      );
    }
  });

  conexion.on("error", (err) => {
    console.log("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      myMysql();
    }else{
      throw err;
    }
  });

}

myMysql();
//module.exports = mysql();

exports.connection = connection;

