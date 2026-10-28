//const { response } = require("express");

window.onload = init;
function init() {
  if (!localStorage.getItem("token")) {document.querySelector('.btn-secondary').addEventListener('click', function()
                                     {window.location.href = "signin.html"}                    );
                                      document.querySelector('.btn-primary').addEventListener('click', login);
                                     } else {window.location.href = "pokedex.html";}
                }
function login() {var mail = document.getElementById('input-mail').value;
                  var password = document.getElementById('input-password').value;
                  //console.log(mail, password);
                  axios({method: 'post', url: 'http://localhost:3000/User/Login', 
                         data: {user_mail: mail, user_password: password}
                       }).then(function(response) {//console.log(response.data);

                        if (response.data.code === 200) 
                          {localStorage.setItem("token", response.data.message);
                            window.location.href = "Pokedex.html"
                          }//{alert("Inicio Exitoso");}
                        else {alert("Usuario y/o Contraseña Incorrectos");}
                       })
                         .catch(function(err) {console.log(err);})
                 }
//Ctrl + Shift + I para abrir consola de desarrollador en Edge