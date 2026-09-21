const express = require('express');
const pokemon = express.Router();
const db = require('../Configuration/DataBase');
const pk = require('../pokedex.json').pokemon;

pokemon.post("/", (request, response, next) => 
    {return response.status(200).send(request.body);});

pokemon.get('/', async (request, response, next) => 
    {const pkmn = await db.query("SELECT * FROM pokemon");
        //console.log(pk);
     return response.status(200).json(pkmn);});

         //(/^\/pokemon\/([0-9]{1,3})$/,
pokemon.get(/^\/([0-9]{1,3})$/, (request, response, next) =>
    {const id = request.params[0] - 1;
     if (!(id >= 0 && id <= 150))
    {return response.status(404).send('Pokemon no Encontrado');}
     return response.status(200).send(pk[id]);});

         //(/^\/pokemon\/([A-Za-z]+)$/,
pokemon.get(/^\/([A-Za-z]+)$/, (request, response, next)  => 
    {const name = request.params[0];//params.id > params[0]
        /*for (i=0; i<pokemon.length; i++) 
            {if (pokemon[i].name.toUpperCase() == name.toUpperCase())
                {return response.status(200).send(pokemon[i]);}}*/
    const pkmn = pk.filter((p) => 
        {return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;});
        (pkmn.length > 0) ? 
        response.status(200).send(pkmn) : response.status(404).send("Pokemon no Encontrado");});

module.exports = pokemon;