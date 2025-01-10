const dataBase =
  process.env.DB_ENGINE === "mysql"
    ? "../../dataBases/mysql"
    : "../../dataBases/sqlserver";

const DB = require(dataBase);

const TABLE = "company";

function all() {
  return DB.all(TABLE);
}


module.exports = {
  all,
};
