const conn =
  process.env.DB_ENGINE === "mysql"
    ? require("../../config_Mysql")
    : require("../../config_SqlServer");

function unique(table, id) {
 
  const getData = async () => {
    const sql = `SELECT * FROM ${table} WHERE Uuid = '${id}' and Active = 1`;
    const [rows] = await conn.connection.query(sql);
    return rows;
  };
  return getData();
}

function unique_server(table,id) {

  const getData = async () => {
    const pool = await conn;
    const rta = await pool.request().query(
        `SELECT * FROM ${table} WHERE Uuid = '${id}' and Active = 1`
    );
    return rta;


  };
  return getData();
}

module.exports = {
  unique,
  unique_server
};
