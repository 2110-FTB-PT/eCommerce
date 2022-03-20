/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

//---imports
require('dotenv').config(); 
const { PORT = 3000 } = process.env; 
const express = require('express'); 
const morgan = require('morgan'); 
const cors = require('cors'); 
const apirouter = require('./api'); 
const client = require('./db/client'); 


//---configs
const server = express(); 
server.use(express.json()); 
server.use(morgan('dev')); 
server.use(cors()); 
server.use('/', (req, res, next) => { 
  next(); 
}); 


//---routes 
//GET /
server.get('/', (req, res, next) => { 
  res.send( {name: '/', message: 'Next available sub-path: /api'} ); 
}); 
server.use('/api', apirouter); 


//---error handlers
server.use( (err, req, res, next) => { 
  console.error(err); 
  res.send(err); 
}); 


//---server on 
server.listen( PORT, () => { 
  console.log('CORS enabled web server is listening on port: ', PORT); 
  client.connect(); 
}); 

