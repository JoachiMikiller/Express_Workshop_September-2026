const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => 
    {try {const token = request.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, "debug_key");
          request.user = decoded;
          next();
         }
     catch (error) {response.status(401);
                    return response.status(401).json({code: 401, message: "No Tienes Autorización :("});}
    }