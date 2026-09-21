
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./Routes/Pokemon');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/*
GET  -  Obtener Recursos 
POST -  Almacenar o Crear Recursos
PATCH - Modificar una Parte de un Recurso
PUT  -  Modificar un Recurso Completo
DELETE - Borrar un Recurso
*/
app.get("/", (request, response, next) => 
    {return response.status(200).send('Bienvenido al Pokedex');});

app.use("/pokemon", pokemon);

app.listen(process.env.PORT || 3000, () => 
    {console.log('Server is runnig...');});

    //Para cerrar el servidor es con Ctrl + -C
    //req = request (sirve para peticion del usuario)
    //res = response
    //require (importa herramientas o modulos)
