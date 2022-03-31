/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

const client = require('./client'); 
const { 
  addCoffeebeans
} = require('./data'); 
const { 
  getCoffeebeans
} = require('./coffeebeans'); 


const dropTables = async () => {
  try { 
    const query = `
      DROP SEQUENCE IF EXISTS 
      coffeebeansId,
      coffeesetsId,
      tealeavesId,
      teasetsId
      CASCADE; 

      DROP TABLE IF EXISTS 
      buyers_products, 
      products, 
      coffeebeans,
      coffeesets,
      tealeaves,
      teasets,
      buyers
      CASCADE; 
    `; 
    await client.query(`${query}`); 
  } catch (error) { throw error; } 
} //dropTables() 


const createTables = async () => { 
  try { 
    const coffeebeans = ` 
      CREATE TABLE coffeebeans (
      id SERIAL PRIMARY KEY, 
      qty INTEGER NOT NULL, 
      sold INTEGER NOT NULL DEFAULT 0, 
      price DECIMAL(10,2) NOT NULL CHECK (price > 0),
      name TEXT UNIQUE NOT NULL, 
      blend TEXT,
      aromas TEXT,
      imgcode VARCHAR(255) 
    ); `; 
    const cbseq = `
      ALTER SEQUENCE coffeebeans_id_seq 
      RESTART WITH 101; 
    `; 
    const coffeesets = ` 
      CREATE TABLE coffeesets (
      id SERIAL PRIMARY KEY,
      qty INTEGER NOT NULL, 
      sold INTEGER NOT NULL DEFAULT 0,
      price DECIMAL(10,2) NOT NULL CHECK (price > 0),
      name TEXT UNIQUE NOT NULL, 
      blend TEXT,
      aromas TEXT,
      imgcode VARCHAR(255)
    ); `; 
    const csseq = `
      ALTER SEQUENCE coffeesets_id_seq 
      RESTART WITH 201;
    `;
    const tealeaves = ` 
      CREATE TABLE tealeaves (
      id SERIAL PRIMARY KEY,
      qty INTEGER NOT NULL, 
      sold INTEGER NOT NULL DEFAULT 0,
      price DECIMAL(10,2) NOT NULL CHECK (price > 0),
      name TEXT UNIQUE NOT NULL, 
      blend TEXT,
      aromas TEXT,
      imgcode VARCHAR(255)
    ); `; 
    const tlseq = `
      ALTER SEQUENCE tealeaves_id_seq
      RESTART WITH 301;
    `;
    const teasets = ` 
      CREATE TABLE teasets (
      id SERIAL PRIMARY KEY, 
      qty INTEGER NOT NULL, 
      sold INTEGER NOT NULL DEFAULT 0,
      price DECIMAL(10,2) NOT NULL CHECK (price > 0),
      name TEXT UNIQUE NOT NULL, 
      blend TEXT,
      aromas TEXT,
      imgcode VARCHAR(255)
    ); `; 
    const tsseq = `
      ALTER SEQUENCE teasets_id_seq 
      RESTART WITH 401; 
    `;
    const buyers = ` 
      CREATE TABLE buyers (
      id SERIAL PRIMARY KEY, 
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL, 
      email VARCHAR(255), 
      location VARCHAR(255)
    ); `; 
    const products = `
      CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      itemid INTEGER NOT NULL, 
      "buyerId" INTEGER REFERENCES buyers(id), 
      stockdate DATE, 
      UNIQUE (itemid, "buyerId")
    ); `;

    await client.query(`
      ${coffeebeans}; 
      ${cbseq}; 
      ${coffeesets};
      ${csseq}; 
      ${tealeaves}; 
      ${tlseq};
      ${teasets}; 
      ${tsseq}; 
      ${buyers}; 
      ${products}; 
    `); 
  } catch (error) { throw error; } 
} //createTables() 


const rebuildDB = async () => { 
  try { 
    await dropTables(); console.log('>>> done droptables');
    await createTables(); console.log('>>> done createtables'); 
    await addCoffeebeans(); console.log('>>> done addCoffeebeans data'); 

  } catch (error) { 
    console.log('>>> rebuildb-catch',error); throw error; 
  } 
} //rebuildDB() 


client.connect()
  .then(rebuildDB)
  .catch(console.error)
  .finally( () => client.end() ); 
