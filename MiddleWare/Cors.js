module.exports = (request, response, next) => 
    {response.header("Access-Control-Allow-Origin", "http://localhost:3001");
     response.header("Access-Control-Allow-Headers", 
                     "Authorization, Origin, X-Requested-With, Content-Type, Accept");
                     if (request.method === 'OPTIONS') 
                        {response.header("Access-Control-Allow-Methods","PUT, POST, PATCH, DELETE, GET");
                            return response.status(200).json({});
                        } next();
}