const express = require("express");
const querystring = require('querystring');
const request = require('request');
const bodyParser = require('body-parser');

/**
 * Inicializacion de servicios
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});



/**
 * Metodo utilizado para configurar la peticion que se ejecutara en el web service backend
 */
var prepareRequestOptions = function(route,method,params) { 
  //Setear Headers
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  formData = querystring.stringify(params);

  var options = {
    url     : route,
    method  : method,
    headers : headers,
    body    : formData
  }

  return options;
};

/**
 * Metodo utilizado para configurar la respuesta que se regresa al front
 */

var prepareResponseOptions = function (result,status_code) {
  var response = {
    success: result.success,
    message_success: result.data,
    status_code: status_code,
    cod_error: result.cod_error,
    message_error: result.message_error,  
  }; 
  return response;
};

/**
 * Creación de Cliente
 */
app.post('/clients/create', function (req, res) {
  
  var params = {
    'name': req.body.name,
    'email': req.body.email,
    'document': req.body.document,
    'cell_phone': req.body.cell_phone
  };

  var options = prepareRequestOptions(
    'http://wallet.test/api/clients/create',
    'POST',
    params
  );

  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {      
      var result = JSON.parse(body);
      var response =  prepareResponseOptions(result,200);
      res.status(200).send(response);
      
    }else{
      //Problemas de validacion
      if (response.statusCode == 400) {   
        var result = JSON.parse(body);
        var response =  prepareResponseOptions(result,400);
        res.status(400).send(response);
      }
      //Error de proceso
      else if (response.statusCode == 500) { 
        var result = JSON.parse(body);
        var response =  prepareResponseOptions(result,500);
        res.status(500).send(response);
      }
    }
  });
});