/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

//---imports 
const { Client } = require('pg'); 
const CONNECTION = process.env.DATABASE_URL || 'postgres://localhost:5432/shopper-dev'; 
const client = new Client(CONNECTION); 


//---exports 
module.exports = client;  
