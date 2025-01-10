
const auth = require('../authentication/index')
module.exports = function checkoutAuth(){

    function middleware(req,res,next){
        auth.chequearToken.confirmarToken(req)
        next();
    }

    return middleware
}