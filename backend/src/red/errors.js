const respuesta = require('./respuestas');

function errors(err, req, res, next){

    const message = err.message || 'Error interno';
    const status = err.statusCode || 500;

    respuesta.error(req, res, message , status);
}

module.exports = errors;