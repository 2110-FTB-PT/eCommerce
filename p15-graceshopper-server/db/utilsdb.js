/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

//---imports 
const client = require('./client'); 


//---definitions 

const _checkDuplicatedName = async (name, table) => {  
  try { 
    const query = `
      SELECT name 
      FROM ${table}; 
    `; 
    const {rows: names} = await client.query(`${query}`); 
    if (names.length = 0) return;  
    for (let i=0; i < names.length; i++ ) {
      const text = names[i].name.toLowerCase(); 
      if (text === name.toLowerCase() ) { 
        throw `name: '${name}' has already been existed. A duplication is not accepted.`; 
      } else return; 
    } //for
  } catch (error) { throw error; } 
} //_checkDuplicationName() 


//---exports: for internal uses 
module.exports = _checkDuplicatedName; 
