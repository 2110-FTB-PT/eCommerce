/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/


const axios = require('axios'); 
const COFFEEBEANS = process.env.REACT_APP_CB_URL || 'http://localhost:4500/api/coffeebeans/'; 
const USER = process.env.REACT_APP_USER_URL || 'http://localhost:4500/api/users/'; 


export const getCoffeebeans = async (signal) => { 
//return an array of coffeebeans items
  try { 
    const {data: response} = await axios.get(COFFEEBEANS, signal); 
    return response; 
  } catch (error) { throw error.response; } 
} //getCoffeebeans() 


export const updateCoffeebeans = async (coffeebeans, signal) => { 
//return an array of coffeebeans items
  try { 
    const {data: response} = await axios.post(COFFEEBEANS, coffeebeans, signal); 
    return response; 
  } catch (error) { throw error.response; } 
} //updateCoffeebeans()  


export const postUser = async (task, user, signal) => { 
//create a new user 
  try {  
    const path = USER + task; 
    const {data: response} = await axios.post(path, user, signal); 
    return response; 
  } catch (error) { throw error.response; } 
} //postUser() 
  

export const createInvoice = async (invoice, signal) => { 
//return an array of coffeebeans items
  try { 
    const {data: response} = await axios.post(COFFEEBEANS, invoice, signal); 
    return response; 
  } catch (error) { throw error.response; } 
} //updateCoffeebeans() 


export const getYearInvoices = async (year, signal) => { 
} //getYearInvoices() 