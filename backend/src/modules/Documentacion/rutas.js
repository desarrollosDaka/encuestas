const express = require('express');
const multer=require('multer');
const path = require('path');
const router = express.Router();
const respuesta = require('../../red/respuestas');
const controller = require("./controller");
const fs = require('fs')

const fileFilter=function(req,file,cb){

  const allowedTypes=["image/jpg","image/jpeg","image/png","image/JPG","image/JPEG","image/PNG","application/pdf"];

  if(!allowedTypes.includes(file.mimetype)){

    const error=new Error("wrong file type");
    error.code="LIMIT_FILE_TYPES";
    return cb(error,false);
  }

  cb(null,true);
}

//Con la dependencia multer lo que hacemos es asignar a qué ruta irán guardados los archivos y qué tipo de nombre tendrá (en este caso he preferido que conserve el nombre original).

 const storage=multer.diskStorage({
  destination: process.env.NODE_ENV === 'development' ? './document_dev' : '../document_prod',
filename:(req,file,cb)=>{
  const extension = file.originalname.split('.').pop()
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  cb(null, file.fieldname + '-' + uniqueSuffix +'.'+ extension)
}
})

const files=[];

const upload=multer({storage});

router.post("/add",add);

router.get("/", all);

router.put("/",del);

router.post('/',upload.single('file'),(req, res) => {

    files.push(req.file); 
    res.json({file: req.file});
});


router.get('/:id',(req, res) => {

  let isRuta = path.join(__dirname, '../../../document_prod').replace(/\\/g, "/");
  
  try {

    fs.unlinkSync(isRuta+'/'+req.params.id);
    console.log("Delete File successfully.",req.params.id);
  } catch (error) {
    console.log(error);
  }

});

 

async function add (req, res, next) {
  try{
    const items = await controller.add(req.body);
  
      mensaje = 'ITEM GUARDADO CON EXITO';
  
    respuesta.success(req, res,mensaje, 201);

  }catch(err){
  //  respuesta.error(req,res,err,500);
    next(err);
  }
  };

  async function all (req, res) {
    try{
      const items = await controller.all();
      respuesta.success(req, res,items, 200);
    }catch(err){
      respuesta.error(req,res,err,500);
    }
  };

  async function del (req, res, next) {
    try{
      const items = await controller.del(req.body);
      respuesta.success(req, res,'Item Eliminado Sastifactoriamente', 200);
    }catch(err){
    //  respuesta.error(req,res,err,500);
      next(err);
    }
    };

  
module.exports = router;