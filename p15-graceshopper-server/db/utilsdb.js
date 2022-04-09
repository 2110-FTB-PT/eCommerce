/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

//---imports 
const client = require('./client'); 


//---definitions 
const _checkDuplicatedName = async (table, column, colvalue) => {  
  try { 
    const query = `
      SELECT ${column} 
      FROM ${table} 
      WHERE ${column}='${colvalue}'; 
    `; 
    const {rows: [results]} = await client.query(`${query}`); 
    if (results) { 
      const text = (Object.values(results)[0]).toLowerCase(); 
      if (text === colvalue.toLowerCase() ) { return true; } 
    } //if 
    return false; 
  } catch (error) { throw error; } 
} //_checkDuplicationName() 


//---exports: for internal uses 
module.exports = _checkDuplicatedName; 
