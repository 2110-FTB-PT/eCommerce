/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

const express = require('express'); 
const { 
  getCoffeebeans, 
  updateCoffeebeans,
  createInvoice
} = require('../db'); 


//---configs 
const cbrouter = express.Router(); 
cbrouter.use('/', (req, res, next) => { 
  next(); 
}); 


//---routes 
//GET /api/coffeebeans 
cbrouter.get('/', async (req, res, next) => { 
//return an array of coffeebeans items
  try { 
    const cbdata = await getCoffeebeans();
    res.send(cbdata); 
  } catch (error) { next(error); } 
}); 

//GET /api/invoices/:year
cbrouter.get('/', async (req, res, next) => {
//return an array of all invoices of specified year
  try { 
    const invoices = await getYearInvoices(req.params); 
    res.send(invoices); 
  } catch (error) { next(error); } 
}); 

//POST /api/coffeebeans 
cbrouter.post('/', async (req, res, next) => { 
//return an array of coffeebeans items
  try { 
    console.log('>>> req.body',req.body); 
    const cb = [...req.body.products]; console.log('>>> cb',cb); 
    const cbdata = await Promise.all(cb.map(updateCoffeebeans)); 
    res.send(cbdata); 
  } catch (error) { next(error); } 
}); 

//POST /api/coffeebeans 
cbrouter.post('/', async (req, res, next) => { 
//return an array of coffeebeans items
  try { 
    const cb = req.body; 
    const cbdata = await createInvoice({...req.body}); 
    res.send(cbdata); 
  } catch (error) { next(error); } 
}); 

//---error handlers 
cbrouter.use( (err, req, res, next) => { 
  next(err); 
}); 


//---exports 
module.exports = cbrouter; 
