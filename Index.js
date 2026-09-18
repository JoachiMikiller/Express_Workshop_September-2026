
const bodyParser = require('body-parser')
const express = require("express");
const app = express();
const {pokemon} = require('./pokedex.json')

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

app.post("/pokemon", (request, response, next) => 
    {return response.status(200).send(request.body);});

app.get('/pokemon', (request, response, next) => 
    {return response.status(200).send(pokemon);});

app.get(/^\/pokemon\/([0-9]{1,3})$/, (request, response, next) =>
    {const id = request.params.id - 1;
     if (!(id >= 0 && id <= 150))
    {return response.status(404).send('Pokemon no Encontrado');}
     return response.status(200).send(pokemonid[id]);});

app.get(/^\/pokemon\/([A-Za-z]+)$/, (request, response, next)  => 
    {const name = request.params[0];
        /*for (i=0; i<pokemon.length; i++) 
            {if (pokemon[i].name.toUpperCase() == name.toUpperCase())
                {return response.status(200).send(pokemon[i]);}}*/
    const pk = pokemon.filter((p) => 
        {return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;});
        (pk.length > 0) ? 
        response.status(200).send(pk) : response.status(404).send("Pokemon no Encontrado");});

app.listen(process.env.PORT || 3000, () => 
    {console.log('Server is runnig...');});

    //Para cerrar el servidor es con Ctrl + -C
    //req = request (sirve para peticion del usuario)
    //res = response
    //require (importa herramientas o modulos)
