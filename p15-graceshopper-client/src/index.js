/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

import ReactDOM from 'react-dom'; 
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux'; 
import { cartReducer } from './reducers'; 
import { StoreContext, App } from './components'; 


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
 
const store = createStore(
  cartReducer,
  applyMiddleware(...middleware)
)

ReactDOM.render( 
  <Provider store={store} context={StoreContext}>          
    <App />
  </Provider>, 
  document.querySelector('#root') 
); 

