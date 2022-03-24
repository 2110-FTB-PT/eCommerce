/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

const { 
  insertCoffeebeans
} = require('./coffeebeans'); 


const addCoffeebeans = async () => { 
  const coffeebeans = [   
    { qty: 50,
      price: 17.00,
      name: 'Smochonut',
      blend: 'Dark Roast',
      aromas: 'smoke, dark chocolate, nuts',
      imgcode: 'dak01'
    }, 
    { qty: 50,
      price: 15.00,
      name: 'Wanerth',
      blend: 'Dark Roast',
      aromas: 'smoke, walnuts, earth',
      imgcode: 'dak02'
    }, 
    { qty: 50,
      price: 17.00,
      name: 'Sychoco',
      blend: 'Dark Roast',
      aromas: 'caramel, chocolate, syrup',
      imgcode: 'dak03'
    },
    { qty: 50,
      price: 18.00,
      name: 'Chercinmon',
      blend: 'Dark Roast',
      aromas: 'toffee, cherry, cinnamon',
      imgcode: 'dak04'
    }, 
    { qty: 50,
      price: 16.50,
      name: 'Tobaherbs',
      blend: 'Dark Roast',
      aromas: 'tobacco, cardamom, herbs',
      imgcode: 'dak05'
    }, 
    { qty: 50,
      price: 15.00,
      name: 'Nutcaraber',
      blend: 'Medium Roast',
      aromas: 'caramel, nuts, butter',
      imgcode: 'med06',
    }, 
    { qty: 50,
      price: 15.00,
      name: 'Bernila',
      blend: 'Medium Roast',
      aromas: 'toast, berry, vanilla',
      imgcode: 'med07'
    }, 
    { qty: 50,
      price: 15.00,
      name: 'Maperth',
      blend: 'Medium Roast',
      aromas: 'cardamom, maple, earth',
      imgcode: 'med08'
    }, 
    { qty: 50,
      price: 17.00,
      name: 'Hazelchoco',
      blend: 'Medium Roast',
      aromas: 'hazelnut, chocolate',
      imgcode: 'med09'
    }, 
    { qty: 50,
      price: 18.00,
      name: 'Cocoacibuter',
      blend: 'Medium Roast',
      aromas: 'dark cocoa, citrus, butterscotch',
      imgcode: 'med10'
    }, 
    { qty: 50, 
      price: 18.00,
      name: 'Pincasco',
      blend: 'Light Roast',
      aromas: 'pinapple, cashew, cocoa',
      imgcode: 'lgh11'
    }, 
    { qty: 50, 
      price: 16.00,
      name: 'Flocherus',
      blend: 'Light Roast', 
      aromas: 'floral, cherry, citrus', 
      imgcode: 'lgh12'
    }, 
    { qty: 20, 
      price: 17.00,
      name: 'Mapear',
      blend: 'Decaf',
      aromas: 'smoke, maple, earth',
      imgcode: 'dcf13'
    }, 
    { qty: 20, 
      price: 16.50,
      name: 'Browgar', 
      blend: 'Decaf',
      aromas: 'brown sugar, vanilla, citrus',
      imgcode: 'dcf14'
    }, 
    { qty: 20, 
      price: 18.00, 
      name: 'Tropicho',
      blend: 'Decaf',
      aromas: 'caramel, tropical fruit, chocolate',
      imgcode: 'dcf15'
    }, 
    { qty: 50, 
      price: 18.00,
      name: 'Origin',
      blend: 'Varietals',
      aromas: 'hazelnut, almond, milk chocolate',
      imgcode: 'org16'
    }
  ]; 
  try { 
    const addeditem = await Promise.all(coffeebeans.map(insertCoffeebeans)); 
  } catch (error) { throw error; } 
} //addCoffeebeans() m


module.exports = { 
  addCoffeebeans
} 
