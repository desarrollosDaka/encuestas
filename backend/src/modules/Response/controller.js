const dataBase =
  process.env.DB_ENGINE === "mysql"
    ? "../../dataBases/mysql"
    : "../../dataBases/sqlserver";

const DB = require(dataBase);

const TABLE = "response";


function insert(body,ip) {
  
  return DB.insert({table:TABLE, data:body, ip:ip});
}

function unique(params) {
  return DB.unique(TABLE, params);
}

function update(body) {
  return DB.updateAutomatize(TABLE, body);
}

function paginator(params) {
  return DB.paginator(TABLE, params);
}

function paginatorTotalRows(params) {
  return DB.getPaginatorTotalRows(TABLE, params);
}


module.exports = {

  insert,
  unique,
  paginator,
  paginatorTotalRows,
  update
};
