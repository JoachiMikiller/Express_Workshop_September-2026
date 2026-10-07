const express = require('express');
const pokemon = express.Router();
const db = require('../Configuration/DataBase');
const pk = require('../pokedex.json').pokemon;

pokemon.post("/", async(request, response, next) => 
    {const { pok_name, pok_height, pok_weight, pok_base_experience } = request.body;
    if (pok_name && pok_height && pok_weight && pok_base_experience) 
        {let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
         query += `VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
         const rows = await db.query(query);
         console.log(rows);
         if (rows.affectedRows == 1) 
            {return response.status(201).json({code: 201, message: "Pokemon Insertado Correctamente"});}
         return response.status(500).json({code: 500, message: "Ocurrió un Error"});
        } return response.status(500).json({code: 500, message: "Campos Incompletos"});
    }       );

pokemon.delete(/^\/([0-9]{1,3})$/, async(request, response, next) => 
    {const id = request.params[0];
        const query = `DELETE FROM pokemon WHERE pok_id = ${id}`;
     const rows = await db.query(query);
     if (rows.affectedRows == 1) 
        {return response.status(200).json({code: 200, message: "Pokemon Borrado Correctamente"});}
     return response.status(404).json({code: 404, message: "Pokemon No Encontrado"});
    }         );

pokemon.put(/^\/([0-9]{1,3})$/, async(request, response, next) => 
    {const id = request.params[0];
     const { pok_name, pok_height, pok_weight, pok_base_experience } = request.body;
     if (pok_name && pok_height && pok_weight && pok_base_experience) 
        {let query = `UPDATE pokemon SET pok_name = '${pok_name}', pok_height = ${pok_height}, `;
         query += `pok_weight = ${pok_weight}, pok_base_experience = ${pok_base_experience} WHERE pok_id = ${id}`;
         const rows = await db.query(query);
         if (rows.affectedRows == 1) 
            {return response.status(200).json({code: 200, message: "Pokemon Actualizado Correctamente"});}
         return response.status(500).json({code: 500, message: "Ocurrió un Error"});
        }return response.status(500).json({code: 500, message: "Campos Incompletos"});
    }      );

pokemon.patch(/^\/([0-9]{1,3})$/, async(request, response, next) => 
    {const id = request.params[0];
        console.log(request.body)
     if (request.body.pok_name) 
        {let query = `UPDATE pokemon SET pok_name = '${request.body.pok_name}' WHERE pok_id = ${id}`;
         const rows = await db.query(query);
         if (rows.affectedRows == 1) 
            {return response.status(200).json({code: 200, message: "Pokemon Actualizado Correctamente"});}
         return response.status(500).json({code: 500, message: "A Ocurrido un Error"});
        }return response.status(500).json({code: 500, message: "Campos Incompletos"});
    }        );
     
pokemon.get('/', async(request, response, next) => 
    {const pkmn = await db.query("SELECT * FROM pokemon");
        //console.log(pk);
     return response.status(200).json({code: 1, message: pkmn});});

         //(/^\/pokemon\/([0-9]{1,3})$/,
pokemon.get(/^\/([0-9]{1,3})$/, async(request, response, next) =>
    {const id = request.params[0];
        if ((id >= 1 && id <= 722)) 
            {const pokemon = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id + ";");
     return response.status(200).json({code: 200, message: pkmn});}
     return response.status(404).send({code: 404, message: "Pokemon no Encontrado"});});

         //(/^\/pokemon\/([A-Za-z]+)$/,
pokemon.get(/^\/([A-Za-z]+)$/, async(request, response, next)  => 
    {const name = request.params[0];//params.id > params[0]
        /*for (i=0; i<pokemon.length; i++) 
            {if (pokemon[i].name.toUpperCase() == name.toUpperCase())
                {return response.status(200).send(pokemon[i]);}}*/
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + name + "';");
    
        //pk.filter((p) => 
        //{return (p.name.toUpperCase() == name.toUpperCase()) ? p : null;});
        return (pkmn.length > 0) ? 
        response.status(200).json({code: 200, message: pkmn})         :
        response.status(404).send({code: 404, message: "Pokemon no Encontrado"});});

module.exports = pokemon;