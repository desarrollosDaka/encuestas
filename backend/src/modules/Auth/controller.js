const dataBase =
  process.env.DB_ENGINE === "mysql"
    ? "../../dataBases/mysql"
    : "../../dataBases/sqlserver";
const DB = require(dataBase);
const query = require("./query");
const auth = require("../../authentication");
const TABLE = "auth";
const bcrypt = require("bcrypt");

async function login(Usuario, Password) {
  const data =
    process.env.DB_ENGINE === "mysql"
      ? await query.auth(TABLE, Usuario)
      : await query.auth_server(TABLE, Usuario);

  if (data) {
    return bcrypt.compare(Password, process.env.DB_ENGINE === "mysql"
    ? data[0].Password : data.recordset[0].Password).then((resultado) => {
      if (resultado === true && data) {
        //GENERAR TOKEN
        return auth.Token({ ...data });
      } else {
        throw new Error("Informacion Invalida");
      }
    });
  } else {
    throw new Error("Usuario no Existe en la Bases de Datos.");
  }
}

async function insert(data) {
  const authData = {
    Id: data.Id,
  };

  if (data.Usuario) {
    authData.Usuario = data.Usuario;
  }

  if (data.UsrCrea) {
    authData.UsrCrea = data.UsrCrea;
  }

  if (data.FecCrea) {
    authData.FecCrea = data.FecCrea;
  }

  if (data.Password) {
    authData.Password = await bcrypt.hash(data.Password.toString(), 5);
  }

  //return DB.insert(TABLE, authData);
  return DB.insert({table:TABLE, data:authData});
}

function del(body) {
  return DB.del(TABLE, body);
}

async function update(body) {
  if (body.Password) {
    body.Password = await bcrypt.hash(body.Password.toString(), 5);
  }

  return DB.update(TABLE, body);
}

function unique(id) {
  return process.env.DB_ENGINE === "mysql"
    ? query.uniqueAuth(id)
    : query.uniqueAuth_server(id);
}

function user() {
  return process.env.DB_ENGINE === "mysql"
    ? query.users()
    : query.users_server();
}

module.exports = {
  insert,
  login,
  del,
  update,
  unique,
  user,
};
