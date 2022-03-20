/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

const client = require('./client'); 
const _checkDuplicatedName = require('./utilsdb'); 


const insertCoffeebeans = async (fields) => { 
//fields {require: qty, name, price; option: blend, aromas, imgcode, onsale}
//return an object of newly inserted fields of all columns  
  const cols = Object.keys(fields).map(col => `"${col}"`).join(', '); 
  const keys = Object.keys(fields).map((_, i) => `$${i+1}`).join(', ');
  const vals = Object.values(fields); 
  const name = fields.name; 
  try { //nextval('coffeebeans_id_seq'), 
    await _checkDuplicatedName(name, 'coffeebeans'); 
    const query = `
      INSERT INTO coffeebeans (${cols}) 
      VALUES (${keys}) 
      ON CONFLICT (name) DO NOTHING
      RETURNING * ; 
    `; 
    const {rows: [addeditem]} = await client.query(`${query}`, vals); 
    return addeditem; 
  } catch (error) { throw error; } 
} //insertCoffeebeans() 


const getCoffeebeans = async () => { 
//return an array of coffeebeans items
  try { 
    const {rows: coffeebeans} = await client.query(` 
      SELECT * 
      FROM coffeebeans; 
    `); 
    return coffeebeans; 
  } catch (error) { throw error; } 
} //getCoffeebeans() 


module.exports = { 
  insertCoffeebeans,
  getCoffeebeans
} 