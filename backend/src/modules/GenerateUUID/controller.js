const dataBase = process.env.DB_ENGINE === 'mysql' ? '../../dataBases/mysql' : '../../dataBases/sqlserver';

const DB = require(dataBase);

const query = require("./query");

const TABLE = 'uuid_session';

 
function unique(id) {

    return process.env.DB_ENGINE === "mysql"
    ? query.unique(TABLE,id) : query.unique_server(TABLE,id);
}


function insert(body) {

    //return DB.insert(TABLE, body);
    return DB.insert({table:TABLE, data:body});
    
}

function del(params) {

    return DB.del(TABLE, params);
}



module.exports = {
    insert,
    unique,
    del
}