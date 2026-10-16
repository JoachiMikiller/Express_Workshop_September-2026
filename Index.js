//const bodyParser = require('body-parser');

//Dependencies
const morgan = require('morgan');
const express = require('express');
//const jwt = require('jsonwebtoken');
const app = express();

//Routes
const pokemon = require('./Routes/Pokemon');
const user = require('./Routes/User');

//MiddleWare
const Authorizathion = require('./MiddleWare/Authorization');
const Not_Found = require('./MiddleWare/Not_Found');
const Index_In = require('./MiddleWare/Index_In');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
/*
GET  -  Obtener Recursos 
POST -  Almacenar o Crear Recursos
PATCH - Modificar una Parte de un Recurso
PUT  -  Modificar un Recurso Completo
DELETE - Borrar un Recurso
*/

app.get("/", Index_In);
app.use("/user", user);
app.use(Authorizathion);
app.use("/pokemon", pokemon);
app.use(Not_Found);

app.listen(process.env.PORT || 3000, () => 
    {console.log('Server is runnig...');
    }     );

//Para cerrar el servidor es con Ctrl + -C
//req = request (sirve para peticion del usuario)
//res = response
//require (importa herramientas o modulos)