/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { Link } from 'react-router-dom'; 
import React, { useEffect } from 'react'; 
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { FaSistrix } from 'react-icons/fa'; 
import { 
  Logo, 
  Galary
} from '../img/'; 
import { 
  ItemcountContext
} from './';
import '../css/Header.css'; 


const Header = ( props ) => { 
  // const {itemcount, setItemcount} = useContext(ItemcountContext);
  const itemcount = props.itemcount; 
  const newtab = () => { 
    const url = 'https://www.paypal.com/us/digital-wallet/ways-to-pay/buy-now-pay-later'; 
    const win = window.open(url, '_blank', 'noopener, noreferrer'); 
    if (win) win.opener = null; 
    return win; 
  } //newtab() 

  useEffect( () => { 
  }, [itemcount] ); 

  return <header>
    <nav className='lognav'>
      <ul className='horizontal navlist'> 
        <Link className='loglink' to='/'>Home</Link> 
        <Link className='loglink' to='/api/coffeebeans'>Coffee Beans</Link> 
        <Link className='loglink' to='/api/coffeesets'>Luxury Coffee Sets</Link> 
        <Link className='loglink' to='/api/tealeaves'>Loose Leaf Tea</Link> 
        <Link className='loglink' to='/api/teasets'>Luxury Tea Sets</Link> 
      </ul>
      <ul className='horizontal navlist fullwidth'>
        <li><Link className='loglink' to='/api/login'>Login/Signup</Link></li>
        <li><Link className='loglink' to='/api/buyers/me'>Account</Link></li>
        <li><Link className='loglink cart' to='/shopcart'>
            <Badge color='secondary' badgeContent={itemcount}>
              <ShoppingCartIcon />{' '}
            </Badge>         
          </Link></li>  
      </ul>
    </nav> 
    <nav className='galary'> 
      <img className='logo' src={Logo} alt='grace shopper logo' />
      <div>
        <nav className='searchnav'>
          <form className='searchform' action='/api/search'>
            <input type='text' name='searchterm' placeholder='search terms' />
            <button className='searchicon' type='submit'><FaSistrix /></button> 
          </form> 
          <a className='creditoffer' onClick={newtab}>0% Finance | Buy Now, Pay Later</a> 
        </nav> 
        <img className='imggalary' src={Galary} alt='tea leaves and coffee beans' />
      </div>
    </nav> 
  </header>
} //Header() 

export default Header; 
