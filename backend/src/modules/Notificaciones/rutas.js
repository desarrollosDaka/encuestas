const express = require('express');

const respuesta = require('../../red/respuestas');
const controller = require("./controller");

const router = express.Router();

router.get("/",all); 
router.post("/", update);

async function all (req, res) {

  try{
    const items = await controller.Notificaciones();
    respuesta.success(req, res,items, 200);
  }catch(err){
    respuesta.error(req,res,err,500);
  }
};

async function update (req, res, next) {
  try{
    const items = await controller.update(req.body);
  
      mensaje = 'ITEM ACTUALIZADO CON EXITO';
  
    respuesta.success(req, res,mensaje, 201);

  }catch(err){
    respuesta.error(req,res,err,500);
  //  next(err);
  }
  };
module.exports = router;