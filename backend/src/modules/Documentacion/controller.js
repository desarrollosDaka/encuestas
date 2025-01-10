const dataBase =
  process.env.DB_ENGINE === "mysql"
    ? "../../dataBases/mysql"
    : "../../dataBases/sqlserver";

const DB = require(dataBase);

const TABLE = "Documentacion";

function add(body) {
  //return DB.insert(TABLA, body);
  return DB.insert({table:TABLE, data:body});
}

function all() {
  return DB.all(TABLE);
}

function del(body) {
  return DB.del(TABLE, body);
}

module.exports = {
  add,
  all,
  del,
};
