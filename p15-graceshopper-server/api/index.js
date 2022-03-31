/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

//---imports 
require('dotenv').config(); 
const JWT_SECRET = process.env.JWT_SECRET || 'graceshopper'; 
const jwt = require('jsonwebtoken'); 
const express = require('express');  


//---configs 
const apirouter = express.Router(); 
apirouter.use('/', (req, res, next) => { 
  next(); 
}); 


//---routes 
//GET '/api'
apirouter.get('/', (req, res, next) => {
  res.send( {
    name: '/api',
    message: 'Next available sub-paths: /buyers/me, /coffeebeans, /coffeesets, /tealeaves, /teasets' 
  }); 
}); 
const cbrouter = require('./coffeebeans'); 
apirouter.use('/coffeebeans', cbrouter); 


//---error handlers 
apirouter.use( (err, req, res, next) => { 
  next(err); 
}); 


//---exports 
module.exports = apirouter; 

