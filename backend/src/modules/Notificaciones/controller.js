const dataBase = process.env.DB_ENGINE === 'mysql' ? '../../dataBases/mysql' : '../../dataBases/sqlserver';

const DB = require(dataBase);

const model = require('../../modulos/Notificaciones/modelo');

const TABLE = 'NOTIFICACIONES';

function Notificaciones() {

    return DB.all(TABLE);
}

function update(body) {

    return DB.actualizar(TABLE, body, model.md(body,TABLE));
}
module.exports = {
    Notificaciones,
    update
}