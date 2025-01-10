const conn =
  process.env.DB_ENGINE === "mysql"
    ? require("../../config_Mysql")
    : require("../../config_SqlServer");

function auth(table, Usuario) {
  
  const getData = async () => {
    const sql = `SELECT Id, Usuario, Password FROM ${table} WHERE Usuario = '${Usuario}'
          And Id in (Select Id from usuarios where activo = 1)`;
    const [rows] = await conn.connection.query(sql);
    return rows;
  };
  return getData();
}


function auth_server(table, Usuario){
  const getData = async () => {
    const pool = await conn;
    const rta = await pool.request().query(`
    SELECT Id, Usuario, Password FROM ${table} WHERE Usuario = '${Usuario}'
    And Id in (Select Id from usuarios where activo = 1)
    `);
   return rta;
  };

  return getData();

}


function uniqueAuth(id){
  
    const getData = async () => {
    const sql = `
      SELECT DISTINCT U.Nombre, U.Id, U.Activo,U.IdCompany, U.IdDepartments, U.RolAdministrator, A.Usuario, A.Password, A.UsrCrea, A.FecCrea
      FROM  usuarios AS U
      INNER JOIN auth as A ON U.Id = A.Id
      WHERE A.Usuario = '${id}'
      `;
      const [rows] = await conn.connection.query(sql);
      return rows;
    };
    return getData();
  
  }

  function uniqueAuth_server(id){

    const getData = async () => {
      const pool = await conn;
      const rta = await pool.request().query(`
      SELECT DISTINCT U.Nombre, U.Id, U.Activo,U.IdCompany, U.IdDepartments,U.RolAdministrator,A.Usuario, A.Password, A.UsrCrea, A.FecCrea
      FROM  USUARIOS AS U
      INNER JOIN Auth as A ON U.Id = A.Id
      WHERE A.Usuario = '${id}'
      `)
      return rta;
    };
    return getData();
  
  }


  function users(){
  
    const getData = async () => {
    const sql = `
    SELECT DISTINCT  U.Id, U.Nombre, U.Activo, A.Usuario, U.IdCompany, U.IdDepartments,U.RolAdministrator, A.UsrCrea, A.FecCrea, U.UsrAct, U.FecAct
    FROM  usuarios AS U
    INNER JOIN auth as A ON U.Id = A.Id
    WHERE U.Id not in(1)
    `;
      const [rows] = await conn.connection.query(sql);
      return rows;
    };
    return getData();
  
  }

  function users_server(){
  
    const getData = async () => {
    const pool = await conn;
    const rta = await pool.request().query(`
    SELECT DISTINCT  U.Id, U.Nombre, U.Activo, A.Usuario, U.IdCompany, U.IdDepartments,U.RolAdministrator, A.UsrCrea, A.FecCrea, U.UsrAct, U.FecAct
    FROM  usuarios AS U
    INNER JOIN auth as A ON U.Id = A.Id
    WHERE U.Id not in(1)
    `)
    return rta;
  };
  return getData();
  
  }

module.exports = {
  auth,
  auth_server,
  uniqueAuth,
  uniqueAuth_server,
  users,
  users_server

};
