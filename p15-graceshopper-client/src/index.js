/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import ReactDOM from 'react-dom'; 
import { Provider } from 'react-redux'; 
import { createStore } from 'redux'; 
import { 
  App, 
  cartReducer
} from './components/'; 


const store = createStore(cartReducer); 

ReactDOM.render( 
  <Provider store={store}>
    <App />
  </Provider>, 
  document.querySelector('#root') 
); 

