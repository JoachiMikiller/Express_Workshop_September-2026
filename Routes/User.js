const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../Configuration/DataBase');

user.post("/", async(request, response, next) => 
    {const {user_name, user_mail, user_password} = request.body

     if (user_name && user_mail && user_password) 
        {let query = "INSERT INTO user (user_name, user_mail, user_password)";
         query += `VALUES ('${user_name}', '${user_mail}', '${user_password}')`;
         const rows = await db.query(query);
         
         if (rows.affectedRows == 1) {return response.status(201).json({code:201, message: "Ususario Registrado Correctamente"});}
            return response.status(500).json({code: 500, message: "Ocurrió un Error"});
        }   return response.status(500).json({code: 500, message: "Campos Incompletos"});
    }    );

user.post("/login", async(request, response, next) => 
    {const {user_mail, user_password} = request.body;
     const  query = `SELECT * FROM User WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
     const rows = await db.query(query);

     if (user_mail && user_password) 
        {if (rows.length == 1) 
            {const token = jwt.sign({user_id: rows[0].user_id, user_mail: rows[0].user_mail}, "debug_key");
             return response.status(200).json({code: 200, message: token});}
         else {return response.status(401).json({code: 401, message:"Usuario y/o Contraseña Incorrectos"});}
        }return response.status(500).json({code: 500, message: "Campos Incompletos"});
    }    );    

user.get("/", async(request, response, next) => 
    {const query = "SELECT * FROM user";
     const rows = await db.query(query);
     return response.status(200).json({code: 200, message: rows});
    }   );

module.exports = user;