const dataBase =
  process.env.DB_ENGINE === "mysql"
    ? "../../dataBases/mysql"
    : "../../dataBases/sqlserver";

const DB = require(dataBase);

const TABLE = "departments";

function all() {
  return DB.all(TABLE);
}

function unique(params) {
  return DB.unique(TABLE, params);
}


module.exports = {
  all,
  unique
};
