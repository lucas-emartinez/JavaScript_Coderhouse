'use strict'

let defaultUser = "lucas";
let defaultPassword = "coder";

function Login(){
    let user = $("#loginuser").val();
    let password = $("#loginpw").val();

    $.ajax({
      dataType: 'json',
      
    })
    if(user == defaultUser && password == defaultPassword){
      window.location.href = '/pages/stock.html';
    }
    else{
      Swal.fire({
      icon: 'error',
      text: 'Credenciales invalidas!',
      });
    };
  };

  $('#loginSubmit').on('click', (e) =>{
    e.preventDefault();
    Login();
  })
    
   


