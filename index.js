const express = require("express");
const cors = require('cors')
const querystring = require('querystring');
const request = require('request');
const bodyParser = require('body-parser');

/**
 * Inicializacion de servicios
 */
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

//const apiUri = "http://wallet.test/api"; //Etorno local
const apiUri = "http://67.207.81.224/api"; //Etorno productivo

/**
 * Metodo utilizado para configurar la peticion que se ejecutara en el web service backend
 */
var prepareRequestOptions = function(route,method,params) { 
  //Setear Headers
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  formData = querystring.stringify(params);
  
  var options = {}

  if (method === 'GET') {
    var options = {
      url     : `${route}?${formData}`,
      method  : method,
      headers : headers
    }
  }else if (method === 'POST') {
    var options = {
      url     : route,
      method  : method,
      headers : headers,
      body    : formData
    }
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
    `${apiUri}/clients/create`,
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

/**
 * Consultar saldo en la billetera
 */
app.get('/clients/wallet/balance', function (req, res) {
  
  var params = {
    'document': req.query.document,
    'cell_phone': req.query.cell_phone
  };

  var options = prepareRequestOptions(
    `${apiUri}/clients/wallet/balance`,
    'GET',
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

/**
 * Cargar dinero en la billetera
 */
app.post('/wallets/charge', function (req, res) {
  
  var params = {
    'document': req.body.document,
    'cell_phone': req.body.cell_phone,
    'value': req.body.value,
  };

  var options = prepareRequestOptions(
    `${apiUri}/wallets/charge`,
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

/**
 * Solicitar pago
 */
app.post('/wallets/payrequest', function (req, res) {
  
  var params = {
    'document': req.body.document,
    'cell_phone': req.body.cell_phone,
    'to_pay': req.body.to_pay,
  };

  var options = prepareRequestOptions(
    `${apiUri}/wallets/payrequest`,
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

/**
 * Confirmar pago
 */
app.post('/wallets/paycheck', function (req, res) {
  
  var params = {
    'session_payment': req.body.session_payment,
    'token_payment': req.body.token_payment
  };

  var options = prepareRequestOptions(
    `${apiUri}/wallets/paycheck`,
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