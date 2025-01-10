const mssql = require("../config_SqlServer"); // EN ESTE CASO LA CONEXION ES CON MOTOR BASES DE DATOS SQL SERVER

/////////////////////////////AQUI CREAMOS LAS FUNCIONES QUE PERMITA HACER/////////////////////////////
/////////////////////////////  EL CRUD BASICO PARA CUALQUIER BASES DE DATOS /////////////////////////

function all(tabla){ //TODOS LOS DATOS DE LA TABLA
  
  const getData = async () => {
  const pool = await mssql;
  const rta = await pool.request().query(`
  SELECT * FROM ${tabla}
  `)
  return rta;
};
return getData();
}


function unique(table, params) { //SELECT UNICO
  
  const getData = async () => {

    let sql = `SELECT * FROM ${table} WHERE `;
   
    let where = [];

    for (let key in params) {
      sql += `${key} = @${key} AND `;
      where.push({name: key, value: params[key]});
    }
    // Remueve el ultimo 'AND'
    sql = sql.slice(0, -4);

    const pool = await mssql;
    const request = pool.request();

    where.forEach(param => {
      request.input(param.name, param.value);
    });

    const result = await request.query(sql);
    return result.recordset;
  };
  return getData();
}

function update(table, data) { //ACTUALIZAR

  const getData = async () => {

   
    let setClause = Object.keys(data).map(key => `${key} = @${key}`).join(', ');

    // SQL query
    let sql = `UPDATE ${table} SET ${setClause} WHERE Id = @Id`;

    const pool = await mssql;
    const request = pool.request();

    // Add parameters to SQL query
    Object.keys(data).forEach(key => {
      request.input(key, data[key]);
    });

    const result = await request.query(sql);

    return result;
  };

  return getData();
}

function insert(tabla, data){

  const getData = async () => {
  
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    const column = keys.map(key =>`\'${key}\'`).join(',');

    const columns = column.replace(/'/g,'');

    const placeholders = values.map(value =>`\'${value}\'` ).join(',');

    const query = `INSERT INTO ${tabla} (${columns}) VALUES (${placeholders})`;
    
    const pool = await mssql;
    const rta = await pool.request().query(query, {replacements: values });
    return rta;
  };
  
  return getData();

}



function updateAutomatize(table, body) { //ACTUALIZAR CON PARAMETROS

  const data = body.data;
  const where = body.params;

  const getData = async () => {

    let sql = `UPDATE ${table} SET `;

    let setValues = [];
    let whereValues = [];

    for (let key in data) {
      sql += `${key} = @${key}, `;
      setValues.push({name: key, value: data[key]});
    }

    // Remove the last comma
    sql = sql.slice(0, -2);

    sql += ' WHERE ';

    for (let key in where) {
      sql += `${key} = @${key} AND `;
      whereValues.push({name: key, value: where[key]});
    }

    // Remove the last AND
    sql = sql.slice(0, -5);

    const pool = await mssql;
    const request = pool.request();

    setValues.forEach(param => {
      request.input(param.name, param.value);
    });

    whereValues.forEach(param => {
      request.input(param.name, param.value);
    });

    const result = await request.query(sql);
    return result;
  };
  return getData();
}


function del(table, params) { //ELIMINAR

  const getData = async () => {

    let sql = `DELETE FROM ${table} WHERE `;

    let where = [];

    for (let key in params) {
      sql += `${key} = @${key} AND `;
      where.push({name: key, value: params[key]});
    }
    // Remueve el ultimo AND'
    sql = sql.slice(0, -5);
    
    const pool = await mssql;
    const request = pool.request();

    where.forEach(param => {
      request.input(param.name, param.value);
    });

    const result = await request.query(sql);
    return result;
  };
  return getData();
}

function maxId(tabla){

  const getData = async () => {
    const pool = await mssql;
    const rta = await pool.request().query(`
    SELECT MAX(ID) as ID FROM ${tabla}`);
    //return rta[0][0].ID;
    return rta.recordset[0].ID
  };

  return getData();
}

module.exports = {
  all,
  unique,
  update,
  insert,
  updateAutomatize,
  del,
  maxId
};
