window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init()
{if(localStorage.getItem("token")) 
    {//token = localStorage.getItem("token");
     headers = {headers: {'Authorization': "bearer " + localStorage.getItem("token")}}
    loadPokemon();
}
 else {window.location.href = "index.html";}
}
function loadPokemon() {axios.get(url + "/pokemon", headers)
    //{headers: {'Authorization': "bearer " + localStorage.getItem("token")}}
                                 .then(function(response){console.log(response);
                                    displayPokemon(response.data.message);})
                                 .catch(function(err){console.log(err);})
                       }
function displayPokemon(pokemon) {//console.log("Entró al Display Pokemon");
    var body = document.querySelector("body");
    //console.log(pokemon.length);
    for(var i = 0; i< pokemon.length; i++) 
        {//console.log("for");
        body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`;}
                                 }