/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/


const cartReducer = ( state, action ) => { 
//state: { items[], addedItems[], total:0 }, action: { type, id }  
//return: updated state{}
  const actiontype = action.type; 

  if (actiontype === 'ADD_TO_CART') { 
    let selectedItem = state.items.find(item => item.id === action.id); 
    let cartItem = state.addedItems.find(item => item.id === action.id);
    if (cartItem) {   //update new qty of selectedItem 
      cartItem.qty += 1; 
      total = state.total + cartItem.price; 
      return { 
        ...state, 
        total
      }; 
    } else if (selectedItem.qty > 0) {  //add new selectedItem
      selectedItem.qty = 1; 
      total = state.total + selectedItem.price; 
      return {  
        ...state, 
        addedItems: [...state.addedItems, selectedItem], 
        total 
      }; 
    } //else  
  } //if 
  return state; 
} //cartReducer() 

export default cartReducer; 
