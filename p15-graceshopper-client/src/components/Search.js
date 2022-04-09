/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { useNavigate } from 'react-router-dom'; 
import React, { useContext, useState } from 'react';
import { FaSistrix } from 'react-icons/fa'; 
import {
  QueryitemsContext,
  QuerytermContext,
  ProductsContext,
} from './'; 
import '../css/Search.css'; 


const Search = () => { 
  const {products} = useContext(ProductsContext);  
  const {setQueryitems} = useContext(QueryitemsContext); 
  const {setQueryterm} = useContext(QuerytermContext);
  const [query, setQuery] = useState(''); 
  const navigate = useNavigate(null); 
  let path = '/query'; 

  const newtab = () => { 
    const url = 'https://www.paypal.com/us/digital-wallet/ways-to-pay/buy-now-pay-later'; 
    const win = window.open(url, '_blank', 'noopener, noreferrer'); 
    if (win) win.opener = null; 
    return win; 
  } //newtab() 

  return   <nav className='searchnav'>
    <form className='searchform' type='search' onSubmit={ e => {
      e.preventDefault(); 
      setQueryterm(query); 
      let blend = ''; 
      let term = '';
      setQueryterm(query); 
      if (query) { 
        term = query.toLowerCase(); 
        if (term.includes('dark')) { 
          blend = 'Dark Roast'; 
        } 
        else if (term.includes('medium')) { 
          blend = 'Medium Roast'; 
        } 
        else if (term.includes('light')) { 
          blend = 'Light Roast'; 
        } 
        else if (term.includes('decaf')) { 
          blend = 'Decaf'; 
        } 
        else if (term.includes('varietals')) { 
          blend = 'Varietals'; 
        } else { 
          setQueryitems([]);
          setQuery(''); 
          navigate(path, {replace: true}); 
        }
      }  
      if (blend) { 
        let qitems = []; 
        if (products.length > 0) {
          for (let i=0; i < products.length; i++) { 
            if (products[i].blend === blend) { 
              let qitem = {...products[i]}; 
              qitem.dbindex = i; 
              qitems.push(qitem); 
            } //if  
        } //if products
        setQueryitems(qitems); 
        setQuery(''); 
        navigate(path, {replace: true}); 
      } //if 
    }}}>
      <input 
        type='search' 
        name='query' 
        placeholder='available search terms: dark, medium, light, decaf, or varietals'
        value={query}
        onChange={e => setQuery(e.target.value)} />
      <button className='searchicon' type='submit'><FaSistrix /></button>
    </form> 
  <a className='creditoffer' onClick={newtab}>0% Finance | Buy Now, Pay Later</a> 
  </nav> 
} //Search() 

export default Search; 
