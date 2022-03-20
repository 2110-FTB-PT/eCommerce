/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

const express = require('express'); 
const { getCoffeebeans } = require('../db'); 


//---configs 
const cbrouter = express.Router(); 
cbrouter.use('/', (req, res, next) => { 
  next(); 
}); 


//---routes 
//GET /api/coffeebeans 
cbrouter.get('/', async (req, res, next) => { 
  try { 
    const cbdata = await getCoffeebeans(); 
    res.send(cbdata); 
  } catch (error) { next(err); } 
}); 


//---error handlers 
cbrouter.use( (err, req, res, next) => { 
  next(err); 
}); 


//---exports 
module.exports = cbrouter; 
