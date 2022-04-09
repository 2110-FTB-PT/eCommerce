/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/


import React, { useState, useContext, useEffect } from 'react';
import { getYearInvoices } from '../axios'; 
import {
  LoginContext
} from './'; 
import '../css/User.css';


const Invoices = (props) => { 
  const newinvoice = props.newinvoices; 
  const {login} = useContext(LoginContext); 
  const [invoices, setInvoices] = useState([]); 
  const [historyorders, setHistoryorders] = useState([]); 


  useEffect( async () => {
    if (!invoices) {
      const localInvoices = JSON.parse(localStorage.getItem('invoices')); 
      if (!localInvoices) { 
        try { 
          const curYrInvoices = await getYearInvoices('2022',{signal: AbortCtr}); 
          setInvoices(curYrInvoices); 
        } catch (error) { console.error(error); } 
      }
    }
  }, []); 

  return <>
    {!login ? null : 
    <div className='sidepage'>
      <button className='historybtn' onClick={ () => {
        const hold = JSON.parse(localStorage.getItem('orderhistory')); 
        setHistoryorders(hold); 
      }}>Order History</button>
      <button className='historybtn' onClick={ () => {
        return <>
          {invoices.length <= 0 ? null : <>
          </> }
        </>
      }}>Invoices History</button>
    </div>}
  </>
} //Invoices() 

export default Invoices; 

