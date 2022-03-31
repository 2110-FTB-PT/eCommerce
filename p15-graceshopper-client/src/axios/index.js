/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/


const axios = require('axios'); 
const COFFEEBEANS = process.env.REACT_APP_CB_URL; 


export const getCoffeebeans = async (signal) => { 
//response = an array of coffeebeans items
  try { 
    const {data: response} = await axios.get(COFFEEBEANS, signal); 
    return response; 
  } catch (error) { throw error.response; } 
} //getCoffeebeans() 



