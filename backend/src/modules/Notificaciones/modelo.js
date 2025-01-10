function md(data, TABLE){

    const values = [data];

    const query = `UPDATE ${TABLE} SET Estatus = '${values[0].Estatus}', UsrAct = '${values[0].UsrAct}',FecAct = GETDATE() WHERE Id = ${values[0].Id}`              
    return query;
}

module.exports = {
    md,
    }