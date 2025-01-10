
const mysql = require('../config_Mysql'); // EN ESTE CASO LA CONEXION ES CON MOTOR BASES DE DATOS MYSQL

/////////////////////////////AQUI CREAMOS LAS FUNCIONES QUE PERMITA HACER/////////////////////////////
/////////////////////////////  EL CRUD BASICO PARA CUALQUIER BASES DE DATOS /////////////////////////


function all(table){ //TODOS LOS DATOS DE LA TABLA

  const getData = async () => {

    const sql = `SELECT * FROM ${table}`;
    const [rows] = await mysql.connection.query(sql);
    return rows
  };
  return getData();

}


function unique(table,params){ //SELECT UNICO

  const getData = async () => {

    let sql = `SELECT * FROM ${table} WHERE `;
   
    let where = [];

    for (let key in params) {
      sql += `${key} = ? AND `;
      where.push(params[key]);
    }
    // Remueve el ultimo AND'
    sql = sql.slice(0, -5);
    
    const [rows] = await mysql.connection.query(sql, where);
    return rows
  };
  return getData();
}


function update(table, data){ //ACTUALIZAR


  const getData = async () => {

    let sql = `UPDATE ${table} SET ? WHERE Id = ?`;

    await mysql.connection.query(
      sql,
      [data,data.Id],
      (error, result) => {
        return error ? error : result;
      }
    );
  };
  return getData();

}


function insert({table, data, ip}){ //INSERTAR

  ip ? data.ReqIpClient = ip.split(':').pop() : null

  const getData = async () => {
 
    const keys = Object.keys(data);

    const values = Object.values(data);
    
    const columns = keys.join(',');

    const placeholders = values.map(() => '?').join(','); // Usamos marcadores de posición
    
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    const rta = await mysql.connection.query(query, values);
    
    return rta;

  };
  return getData();

}


function updateAutomatize(table, body){ //ACTUALIZAR

  const data =body.data

  const where = body.params

  if (Object.keys(where).length === 0) {
    throw new Error('No se proporcionaron parámetros para la cláusula WHERE.');
  }

  const getData = async () => {

    let sql = `UPDATE ${table} SET `;

    let values = [];

    for (let key in data) {
      sql += `${key} = ?, `;
      values.push(data[key]);
    }

    // Remueve la última coma
    sql = sql.slice(0, -2);

    sql += ' WHERE ';

    for (let key in where) {
      sql += `${key} = ? AND `;
      values.push(where[key]);
    }
    
    // Remueve el último AND
    sql = sql.slice(0, -5);

    await mysql.connection.query(
      sql,
      values,
      (error, result) => {
        return error ? error : result;
      }
    );
  };
  return getData();

}

// function del(table, params) { //ELIMINAR

//   const getData = async () => {

//     let sql = `DELETE FROM ${table} WHERE `;

//     let where = [];

//     for (let key in params) {
//       sql += `${key} = ? AND `;
//       where.push(params[key]);
//     }
//     // Remueve el ultimo AND'
//     sql = sql.slice(0, -5);
    
//     await mysql.connection.query(
//       sql,
//       where,
//       (error, result) => {
//         return error ? error : result;
//       }
//     );


//   };
//   return getData();
// }


function del(table, params) {
  const getData = async () => {
    
    if (Object.keys(params).length === 0) {
      throw new Error('No se proporcionaron parámetros para la cláusula WHERE.');
    }

    let sql = `DELETE FROM ${table} WHERE `;
    let where = [];

    for (let key in params) {
      sql += `${key} = ? AND `;
      where.push(params[key]);
    }
    // Remueve el ultimo 'AND'
    sql = sql.slice(0, -4);
    
    try {
      const result = await mysql.connection.query(sql, where);
      return result;
    } catch (error) {
      return error;
    }
  };

  return getData();
}

function maxId(table){

  const getData = async () => {
    const sql = `SELECT IFNULL(MAX(ID),1) as ID FROM ${table}`;
    const [rows] = await mysql.connection.query(sql);
    return rows[0]["ID"]
  };

  return getData();
}


function getIPAddress(data){ //VERIFICAR SI YA HA RESPONDIDO UNA ENCUESTA

  const getData = async () => {

    const sql = `SELECT * FROM survey
    where Id in (SELECT IdEncuesta FROM response where ReqIpClient = '${data.ip}')
    And UrlSurvey = '${data.UrlSurvey}'`;

    const [rows] = await mysql.connection.query(sql);

    return rows
  };
  return getData();

}


module.exports = {

    all,
    unique,
    update,
    insert,
    del,
    maxId,
    updateAutomatize,
    getIPAddress

}