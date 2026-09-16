const express = require("express");
const app = express();
const {pokemon} = require('./pokedex.json')

app.get("/", (request, response, next) => 
    {response.status(200);
        response.send('Bienvenido al Pokedex');});

app.get('/pokemon/all', (request, response, next) => 
    {response.status(200);
     response.send(pokemon);});

app.get('/pokemon/:name', (request, response) => {
    const searchName = request.params.name.toLowerCase();

    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i] && pokemon[i].name && pokemon[i].name.toLowerCase() === searchName) {
            response.status(200);
            return response.send(pokemon[i]);
        }
    }
    const possibleId = parseInt(request.params.name) - 1;
    if (!isNaN(possibleId) && possibleId >= 0 && possibleId < pokemon.length) {
        response.status(200);
        return response.send(pokemon[possibleId]);
    }
    response.status(404);
    return response.send("Pokemon no Encontrado");
});

app.get('/pokemon/:id', (request, response, next) => {
    const regex = /^[0-9]{1,3}$/;
    if (!regex.test(request.params.id)) {
        response.status(400);
        return response.send("El ID debe ser un numero de 1 a 3 digitos");
    }
    const id = parseInt(request.params.id) - 1;

    if (id >= 0 && id < pokemon.length) {
        response.status(200);
        return response.send(pokemon[id]);
    } else {
        response.status(404);
        return response.send("Pokemon no Encontrado");
    }
});

app.listen(process.env.PORT || 3000, () => 
    {console.log('Server is runnig...');});

    //Para cerrar el servidor es con Ctrl + -C
    //req = request (sirve para peticion del usuario)
    //res = response
    //require (importa herramientas o modulos)
