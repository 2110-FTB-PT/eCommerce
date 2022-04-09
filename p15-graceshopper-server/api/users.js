/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

//---imports
const express = require('express'); 
const urouter = express.Router();  
const jwt = require('jsonwebtoken'); 
const { JWT_SECRET } = process.env; 
const bcrypt = require('bcrypt'); 
const { 
  getUserByEmail, 
  createUser, 
} = require('../db'); 
const { 
  checkUsername,
  checkPassword,
  checkCredentials, 
  checkExistingUser, 
  checkAuthenticatedUser
} = require('./errutils'); 


//---configs
urouter.use( '/:username', (req, res, next) => { 
  next(); 
}); 


//---routes

//POST /users/register 
urouter.post('/register', async (req, res, next) => { 
  const { email, password } = req.body; 
    
  const uobj = checkUsername(email); //in case front-end not check
  if (uobj) { return next(uobj); } 

  const pobj = checkPassword(password); 
  if (pobj) { return next(pobj); } 

  try { 
    const _user = await getUserByEmail(email);  
    if (_user) { 
      next ({
        code: 409,
        message: `'${email}' already exists. Please log-in.`
      }); 
    }
    const user = await createUser(req.body); 
    const token = jwt.sign({id: user.email}, process.env.JWT_SECRET, {expiresIn: '1w'});
    delete user.password; 
    return res.send({
      user,  
      message: 'You are signed up!',
      token 
    });
  } catch (error) { next(error); } 
}); 


//POST /users/login 
urouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body; 

  const cobj = checkCredentials(email, password); 
  if (cobj) { return next(cobj); }
  try {
    const user = await getUserByEmail(email); 

    const eobj = checkExistingUser(user); 
    if (eobj) { return next(eobj); } 

    const hashedpasswd = user.password; 
    const passwdmatch = await bcrypt.compare(password, hashedpasswd); 
    if (passwdmatch) { //id and username
      const token = jwt.sign({email}, JWT_SECRET, {expiresIn: '1w'});
      delete user.password; 
      return res.send({
        user,  
        message: 'You are logged in!',          
        token 
      }); 
    } else { 
      next({
        code: 404,
        user: {},
        name: 'PasswordError', 
        message: 'Wrong password. Check if: 8 characters or more, or misspelling.',
      }); 
    } 
  } catch(error) { next(error); } 
}); 


//GET /users
urouter.get('/', (req, res) => { 
  return res.send({
    name: '/api/users', 
    message: 'Available sub-paths: /register, /login, /:account'
  }); 
}); 


//---error handlers
urouter.use( (err, req, res, next) => { 
  res.status(err.code || 500);
  res.statusText = err.name || err.message;   
  next(err); 
}); 


//---exports 
module.exports = urouter; 


/*--------------------------------------------------------------------------------
Test commands: 
1. good, GET info-subpaths: 
  curl http://localhost:3400/api/users
  https://p15-graceshopper-server.herokuapp.com/
2. passed, short password: 
  curl https://p14-fitnesstracker-server.herokuapp.com/api/users/account/register -H "Content-Type: application/json" -X POST -d '{"username": "jesslyn", "password": "abcd1234"}' 
  curl http://localhost:3500/api/users/account/register -H "Content-Type: application/json" -X POST -d '{"username": "robertShor", "password": "bobby2"}'
3. good, login: 
  curl https://p14-fitnesstracker-server.herokuapp.com/account/login -H "Content-Type: application/json" -X POST -d '{"username": "albert", "password": "bertie99"}'
  {"token":"eyJhbGciOiJIUzI1","message":"You're logged in!"}
4. good, test token: 
  curl http://localhost:3400/api -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiI'
---------------------------------------------------------------------------------*/

