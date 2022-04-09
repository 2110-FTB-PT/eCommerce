/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

const client = require('./client'); 
const { 
  addCoffeebeans,
  addUsers, 
  testDuplication, 
  testAddPurchases
} = require('./data'); 


const dropTables = async () => {
  try { 
    const query = `
      DROP TABLE IF EXISTS  
      invoices, 
      coffeebeans,
      users
      CASCADE; 
    `; 
    await client.query(`${query}`); 
  } catch (error) { throw error; } 
} //dropTables() 


const createTables = async () => { 
  const users = ` 
    CREATE TABLE users (
      account SERIAL UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE PRIMARY KEY, 
      fullname VARCHAR(255) NOT NULL, 
      phone VARCHAR(255), 
      shipaddress VARCHAR(255), 
      address VARCHAR(255) NOT NULL, 
      city VARCHAR(255),
      state VARCHAR(255),
      zipcode VARCHAR(255) NOT NULL,
      cardtype VARCHAR(255) NOT NULL,
      cardnumber VARCHAR(255) NOT NULL,
      card_exp_mon VARCHAR(255) NOT NULL,
      card_exp_yr VARCHAR(255) NOT NULL, 
      card_cvc VARCHAR(255) NOT NULL, 
      active_account BOOLEAN DEFAULT true,
      password VARCHAR(255)
    ); `; 
  const accountseq = `
    ALTER SEQUENCE users_account_seq 
      RESTART WITH 1001; 
    `; 
  const coffeebeans = ` 
    CREATE TABLE coffeebeans (
      id SERIAL PRIMARY KEY, 
      qty INTEGER NOT NULL, 
      sold INTEGER NOT NULL DEFAULT 0, 
      price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
      name TEXT UNIQUE NOT NULL, 
      blend TEXT,
      aromas TEXT,
      imgindex INTEGER NOT NULL
    ); `; 
  const cbseq = `
    ALTER SEQUENCE coffeebeans_id_seq 
        RESTART WITH 101; 
    `; 
  const invoices = `
    CREATE TABLE invoices ( 
      id SERIAL PRIMARY KEY, 
      "userAccount" INTEGER REFERENCES users(account) NOT NULL,
      date DATE NOT NULL,
      products INTEGER[],
      itemscount INTEGER, 
      subtotal DECIMAL(10,2), 
      tax DECIMAL(10,2), 
      shipping DECIMAL(10,2), 
      totalprice DECIMAL(10,2), 
      cardtype VARCHAR(255) NOT NULL, 
      cardnumber VARCHAR(255) NOT NULL,
      card_exp_mon VARCHAR(10) NOT NULL,
      card_exp_yr VARCHAR(10) NOT NULL, 
      card_cvc VARCHAR(10) NOT NULL
    ); `; 
  try { 
    await client.query(`${users}; ${accountseq}`); 
    await client.query(`${coffeebeans}; ${cbseq}`); 
    await client.query(`${invoices}`); 
  } catch (error) { throw error; } 
} //createTables() 


const rebuildDB = async () => { 
  try { 
    await dropTables(); console.log('Done droptables');
    await createTables(); console.log('Done createtables'); 
    const newusers = await addUsers(); console.log('Done addUsers', newusers);
    await addCoffeebeans(); console.log('Done addCoffeebeans'); 
    // const duplication = await testDuplication(); 
    // const invoices = await testAddPurchases(); 
  } catch (error) { throw error; } 
} //rebuildDB() 


client.connect()
  .then(rebuildDB)
  .catch(console.error)
  .finally( () => client.end() ); 
