module.exports = (request, response, next) => 
    {return response.status(200).json({code: 1, message: "Bienvenido al Pokedex"});}  