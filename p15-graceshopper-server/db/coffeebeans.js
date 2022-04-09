/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

const client = require('./client'); 
const _checkDuplicatedName = require('./utilsdb'); 


const insertCoffeebeans = async (fields) => { 
//fields {require: qty, name, price; option: blend, aromas, imgcode, onsale}
//return an object of newly inserted fields of all columns  
  const name = fields.name; 
  delete fields.name; 
  const cols = Object.keys(fields).map(col => `"${col}"`).join(', '); 
  const keys = Object.keys(fields).map((_, i) => `$${i+1}`).join(', ');
  const vals = Object.values(fields); 
  try { //nextval('coffeebeans_id_seq'), 
    let duplication = await _checkDuplicatedName('coffeebeans', 'name', name); 
    if (duplication) { 
      throw `'${name}' has already been existed. A duplication is not accepted.`; 
    } 
    const query = `
      INSERT INTO coffeebeans (name, ${cols}) 
      VALUES ('${name}', ${keys}) 
      ON CONFLICT (name) DO NOTHING
      RETURNING * ; 
    `; 
    const {rows: [addedItem]} = await client.query(`${query}`, vals); 
    return addedItem; 
  } catch (error) { throw error; } 
} //insertCoffeebeans() 


const updateCoffeebeans = async (fields) => { 
//coffeebeans: [require: an array of coffeebeans]
//updated cart with new choice, [qty], [index, addednum, itemsXprice, note]
  const cols = Object.keys(fields).map(col => `"${col}"`).join(', '); 
  const keys = Object.keys(fields).map((_, i) => `$${i+1}`).join(', ');
  const vals = Object.values(fields); 
  const id = fields.id; 
  try { 
    const query = ` 
      UPDATE coffeebeans 
      SET ${keys} WHERE id=${id}; 
    `; 
    await client.query(`${query}`, vals); 
    const coffeebeans = await getCoffeebeans(); 
    return coffeebeans; 
  } catch (error) { throw error; } 
} //updateCoffeebeans() 


const getCoffeebeans = async () => { 
//return an array of coffeebeans items
  try { 
    const {rows: coffeebeans} = await client.query(` 
      SELECT * 
      FROM coffeebeans 
      WHERE qty > 0;  
    `); 
    return coffeebeans; 
  } catch (error) { throw error; } 
} //getCoffeebeans() 


const getCoffeeByBlend = async (blend) => { 
//return an array of coffeebeans items 
  try {
    const {rows: coffeebeans} = await client.query(`
      SELECT * 
      FROM coffeebeans
      WHERE blend='${blend}' 
        AND qty > 0; 
    `); 
    return coffeebeans; 
  } catch (error) { throw error; } 
} //getCoffeeByBlend() 


const createInvoice = async (fields) => { 
//return a newly created object of an invoice 
  try { 
    const cols = Object.keys(fields).map(col => `"${col}"`).join(', '); 
    const keys = Object.keys(fields).map((_, i) => `$${i+1}`).join(', ');
    const vals = Object.values(fields); 
    const query = `
      INSERT INTO invoices (${cols})
      VALUES VALUES (${keys})
      RETURNING *; 
    `; 
    const {rows: [invoice]} = await client.query(`${query}`, vals); 
    return invoice; 
  } catch (error) { throw error; } 
} //createInvoice() 


const getYearInvoices = async (year) => { 
//return an array of all invoices for the specified year
  try { 
    const {rows: invoices} = await client.query(`
      SELECT * 
      FROM invoices 
      WHERE year='${year}'; 
    `); 
    return invoices; 
  } catch (error) { throw error; } 
} //getYearInvoices() 


module.exports = { 
  insertCoffeebeans,
  getCoffeebeans, 
  getCoffeeByBlend, 
  updateCoffeebeans,
  createInvoice, 
  getYearInvoices
} 