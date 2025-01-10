
const dataBase = process.env.DB_ENGINE === 'mysql' ? '../../dataBases/mysql' : '../../dataBases/sqlserver';

const DB = require(dataBase);

const TABLE = "usuarios";

const auth = require("../Auth/controller");

function all() {
  return DB.all(TABLE);
}

function unique(params) {
  return DB.unique(TABLE,params);
}

function update(body) {
  return DB.update(TABLE, body);
}

async function insert(body) {
  const usuario = {
    Nombre: body.Nombre,
    Activo: body.Activo,
    RolAdministrator:body.RolAdministrator,
    IdCompany: body.IdCompany,
    IdDepartments: body.IdDepartments,
    UsrCrea: body.UsrCrea
  };
  
  //await DB.insert(TABLE, usuario);
  await DB.insert({table:TABLE, data:usuario});

  const idMax = await DB.maxId(TABLE);

  if (body.Usuario || body.Password && idMax) {
    await auth.insert({
      Id: idMax,
      Usuario: body.Usuario,
      Password: body.Password,
      UsrCrea: body.UsrCrea,
      FecCrea: body.FecCrea,
    });
  }

  return true;
}

function del(body) {
  return DB.del(TABLE,body);
}

module.exports = {
  all,
  unique,
  update,
  insert,
  del,
};
