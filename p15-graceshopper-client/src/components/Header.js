/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import { Link } from 'react-router-dom'; 
import React, { useContext, useEffect } from 'react'; 
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Logo, Galary } from '../img/'; 
import { 
  Search,
  ShopcartContext, 
  LoginContext, 
  AccountContext, 
  CustomerContext
} from './';
import '../css/Header.css'; 


const Header = (props) => { 
  const checkout = props.checkout; 
  const {shopcart} = useContext(ShopcartContext); 
  const {login} = useContext(LoginContext);
  const {customer} = useContext(CustomerContext); 
  const {account, setAccount} = useContext(AccountContext);   

  useEffect(() => { 
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) { setAccount(user.account); }
  },[]); 

  return <header>
    <nav className='lognav'>
      <ul className='horizontal navlist'> 
        <Link className='loglink' to='/'>Home</Link> 
        <Link className='loglink' to='/api/coffeebeans'>Coffee Beans</Link> 
        <Link className='loglink' to='/api/tealeaves'>Loose Leaf Tea</Link> 
      </ul>
      <ul className='horizontal navlist fullwidth'>
        {login && <li><span className='greeting'>Hello, {customer}!</span></li>}
        {login && <li><Link className='loglink' to={`/api/users/${account}`}>Account# &nbsp; {account}</Link></li>}
        {login && <li><Link className='loglink' to='/logout' onClick={() => setLogout(true)}>Logout</Link></li>}
        {!login && <li><Link className='loglink' to='/api/login'>Login/Signup</Link></li>}
        <li><Link className='cartlink' to='/shopcart'>
            <Badge className='cart' color='secondary' badgeContent={checkout ? 0 : shopcart.itemscount}>
              <ShoppingCartIcon />{''}
            </Badge>      
          </Link></li>  
      </ul>
    </nav> 
    <nav className='galary'> 
      <img className='logo' src={Logo} alt='grace shopper logo' />
      <div>
        <Search />
        <img className='imggalary' src={Galary} alt='tea leaves and coffee beans' />
      </div>
    </nav> 
  </header>
} //Header() 

export default Header; 
