/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

//---imports 
const client = require('./client'); 
const bcrypt = require('bcrypt'); 


//---definitions 

const createUser = async (fields) => {  
//create a single new user, return an object (password excluded)

  const email = fields.email; 
  const password = fields.password; 
  const cardnumber = fields.cardnumber; 
  let hash = '';

  if (!password || password.length < 8) {
    throw 'Require: password with 8 or more characters'; 
  } else { 
    try { 
      const SALT_COUNT = 10;
      hash = await bcrypt.hash(password, SALT_COUNT); 
      delete fields.password; 
    } catch (error) { throw error; } 
  } 
  if (!email || !cardnumber) { 
    throw `Require: email, cardnumber. Received: '${email}','${cardnumber}'`; 
  } else { 
    try { 
      const duplicateUser = await getUserByEmail(email); 
      if (duplicateUser) { 
        throw `'${email}' has already been existed. A duplication is not accepted.`; 
      }
    } catch (error) { throw error; } 
  } 
  const cols = Object.keys(fields).map(col => `"${col}"`).join(', '); 
  const keys = Object.keys(fields).map((_, i) => `$${i+1}`).join(', ');
  const vals = Object.values(fields); 
  try {
    const query = `
      INSERT INTO users (${cols}, password) 
      VALUES (${keys}, '${hash}') 
      ON CONFLICT (email) DO NOTHING
      RETURNING *; 
    `; 
    const {rows: [newuser]} = await client.query(`${query}`, vals);  
    return newuser; 
  } catch (error) { throw error; } 
} //createUser() 


const getUser = async (fields) => {   
//get a single user, verify hashed password
//return an object (password excluded) or return false
//require: user {'username'(uniq),'password'}
  const { username, password } = fields;   
  if (!username || !password) { 
    throw 'Require: username, password. Found missing.'; 
  }
  try { 
    const user = await getUserByUsername(username);  
    const hashedpasswd = user.password; 
    const passwordsMatch = await bcrypt.compare(password, hashedpasswd); 
    if (passwordsMatch) {
      delete user.password; 
      return user;
    } else { 
      return passwordsMatch; 
    } 
  } catch (error) { throw error; } 
} //getUser() 


const getUserByEmail = async (email) => { 
  //get a single user, return an object (password included)
  //require: 'username'
  if (!email) { 
    throw `Require: user email. Found '${email}'`; 
  } 
  try {
    const {rows: [user]} = await client.query(`
      SELECT *
      FROM users 
      WHERE email='${email}'; 
    `);
    return user;
  } catch (error) { throw error; }  
} //getUserByEmail()


//---exports 
module.exports = { 
  createUser,
  getUserByEmail,
  getUser
} 

