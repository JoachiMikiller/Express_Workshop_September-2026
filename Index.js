const express = require("express");
const app = express();
const {pokemon} = require('./pokedex.json');

app.get("/", (request, response, next) => 
    {response.status(200);
        response.send('Bienvenido al Pokedex');});

app.get('/pokemon/all', (request, response, next) => 
    {response.status(200);
     response.send(pokemon);});

app.get(/^\/pokemon\/([0-9]{1,3})$/, (request, response, next) =>
    {const id = request.params.id - 1;
     if (!(id >= 0 && id <= 150))
    {response.status(200);
     response.send('Pokemon no Encontrado');
     return;}
     response.status(404);
     response.send(pokemonid[id]);});

app.get('/pokemon/:name',(request, response, next)  => 
    {const name = request.params.name;
        for (i=0; i<pokemon.length; i++) 
            {if (pokemon[i].name.toLowerCase() == name.toLowerCase()) 
                {response.status(200);
                 response.send(pokemon[i]);}}
        response.status(404);
        response.send("Pokemon no Encontrado");});

app.listen(process.env.PORT || 3000, () => 
    {console.log('Server is runnig...');});

    //Para cerrar el servidor es con Ctrl + -C
    //req = request (sirve para peticion del usuario)
    //res = response
    //require (importa herramientas o modulos)
