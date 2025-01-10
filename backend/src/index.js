const https = require('https');
const fs = require('fs');
const app = require('./app');


const options = {
  key: fs.readFileSync('./ssl/encuestas.tiendasdaka.com.key'),
  cert: fs.readFileSync('./ssl/encuestas.tiendasdaka.com.crt')
};

//Starting the server
app.listen(app.get("portDev"), () => {
    console.log("Servidor http escuchando en el puerto", app.get("portDev"));
  });

// Starting the server 
https.createServer(options, app).listen(app.get("port"), () => {
  console.log("Servidor https escuchando en el puerto", app.get("port"));
});