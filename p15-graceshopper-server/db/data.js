/*---------------------------------------------------------------------------------
Author:      Jesslyn Bui 
Project-15:  Grace Shopper - eCommerce  
----------------------------------------------------------------------------------*/

//---imports
const { insertCoffeebeans } = require('./coffeebeans'); 
const { createUser } = require('./users'); 


//---definitions
const addCoffeebeans = async () => { 
  const coffeebeans = [   
    { qty: 50,
      price: 17.00,
      name: 'Smochonut',
      blend: 'Dark Roast',
      aromas: 'smoke, dark chocolate, nuts',
      imgindex: 0
    }, 
    { qty: 50,
      price: 15.00,
      name: 'Wanerth',
      blend: 'Dark Roast',
      aromas: 'smoke, walnuts, earth',
      imgindex: 1
    }, 
    { qty: 50,
      price: 17.00,
      name: 'Sychoco',
      blend: 'Dark Roast',
      aromas: 'caramel, chocolate, syrup',
      imgindex: 2
    },
    { qty: 50,
      price: 18.00,
      name: 'Chercinmon',
      blend: 'Dark Roast',
      aromas: 'toffee, cherry, cinnamon',
      imgindex: 3
    }, 
    { qty: 50,
      price: 16.50,
      name: 'Tobaherbs',
      blend: 'Dark Roast',
      aromas: 'tobacco, cardamom, herbs',
      imgindex: 4
    }, 
    { qty: 50,
      price: 15.00,
      name: 'Nutcaraber',
      blend: 'Medium Roast',
      aromas: 'caramel, nuts, butter',
      imgindex: 5
    }, 
    { qty: 50,
      price: 15.00,
      name: 'Bernila',
      blend: 'Medium Roast',
      aromas: 'toast, berry, vanilla',
      imgindex: 6
    }, 
    { qty: 50,
      price: 15.00,
      name: 'Maperth',
      blend: 'Medium Roast',
      aromas: 'cardamom, maple, earth',
      imgindex: 7
    }, 
    { qty: 50,
      price: 17.00,
      name: 'Hazelchoco',
      blend: 'Medium Roast',
      aromas: 'hazelnut, chocolate',
      imgindex: 8
    }, 
    { qty: 50,
      price: 18.00,
      name: 'Cocoacibuter',
      blend: 'Medium Roast',
      aromas: 'dark cocoa, citrus, butterscotch',
      imgindex: 9
    }, 
    { qty: 50, 
      price: 18.00,
      name: 'Pincasco',
      blend: 'Light Roast',
      aromas: 'pinapple, cashew, cocoa',
      imgindex: 10
    }, 
    { qty: 50, 
      price: 16.00,
      name: 'Flocherus',
      blend: 'Light Roast', 
      aromas: 'floral, cherry, citrus', 
      imgindex: 11
    }, 
    { qty: 20, 
      price: 17.00,
      name: 'Mapear',
      blend: 'Decaf',
      aromas: 'smoke, maple, earth',
      imgindex: 12
    }, 
    { qty: 20, 
      price: 16.50,
      name: 'Browgar', 
      blend: 'Decaf',
      aromas: 'brown sugar, vanilla, citrus',
      imgindex: 13
    }, 
    { qty: 20, 
      price: 18.00, 
      name: 'Tropicho',
      blend: 'Decaf',
      aromas: 'caramel, tropical fruit, chocolate',
      imgindex: 14
    }, 
    { qty: 50, 
      price: 18.00,
      name: 'Origin',
      blend: 'Varietals',
      aromas: 'hazelnut, almond, milk chocolate',
      imgindex: 15
    }
  ]; 
  try { 
    const addedCb = await Promise.all(coffeebeans.map(insertCoffeebeans)); 
    return addedCb; 
  } catch (error) { throw error; } 
} //addCoffeebeans() 


const addUsers = async () => { 
  const users = [ 
    {
      email: 'albertb@gmail.com',
      password: 'bertie99', 
      fullname: 'Albert Benton',
      phone: '650-730-9801',
      shipaddress: '456 Homestead Rd, Alviso, CA 95010',
      address: '456 Homestead Rd',
      city: 'Alviso',
      state: 'CA',
      zipcode: '95010',
      cardtype: 'visa',
      cardnumber: '4242 4242 4242 4242', 
      card_exp_mon: 'Apr',
      card_exp_yr: '2024',
      card_cvc: '376'
    },
    {
      email: 'sandrab@gmail.com',
      password: 'sandra321',
      fullname: 'Sandra Benton',
      phone: '650-730-9802',
      shipaddress: '2800 Lick Mill Dr, Santa Clara, CA 95050',
      address: '456 Homestead Rd',
      city: 'Alviso',
      state: 'CA',
      zipcode: '95010', 
      cardtype: 'discover',
      cardnumber: '6011 1111 1111 1117',
      card_exp_mon: 'Jul',
      card_exp_yr: '2026',
      card_cvc: '890'
    },
    { 
      email: 'glamgalb@gmail.com',
      password: 'glamgal456',
      fullname: 'Glamgal Benton',
      phone: '650-730-9803',
      shipaddress: '456 Homestead Rd, Alviso, CA 95010',
      address: '456 Homestead Rd',
      city: 'Alviso',
      state: 'CA',
      zipcode: '95010',
      cardtype: 'american express',
      cardnumber: '3714 496353 98431',
      card_exp_mon: 'Mar',
      card_exp_yr: '2025',
      card_cvc: '455'
    }
  ]; 

  try { 
    const addedUsers = await Promise.all(users.map(createUser)); 
    return addedUsers; 
  } catch (error) { throw error; } 
} //addUsers() 


//---Tests: 
const duplicatedCb = { 
  qty: 20, 
  price: 16.50,
  name: 'Browgar', 
  blend: 'Decaf',
  aromas: 'brown sugar, vanilla, citrus',
  imgindex: 'dcf14'
};
const duplicatedUser = {
  email: 'sandrab@gmail.com',
  password: 'sandra321',
  fullname: 'Sandra Benton',
  phone: '650-730-9802',
  shipaddress: '2800 Lick Mill Dr, Santa Clara, CA 95050',
  address: '456 Homestead Rd',
  city: 'Alviso',
  country: 'USA',
  state: 'CA',
  zipcode: '95010', 
  cardtype: 'discover',
  cardnumber: '6011 1111 1111 1117',
  card_exp_mon: 'Jul',
  card_exp_yr: '2026',
  card_cvc: '890'
}; 
const testDuplication = async () => {
  try { 
    let duplication;
    // duplication = await createUser(duplicatedUser); 
    duplication = await insertCoffeebeans(duplicatedCb); 
    return duplication; 
  } catch (error) { throw error; }
} //testDuplication() 


const testInvoice = async () => { 
  try { 
    const invoice = { 
      userId: 1,
    //   coffeebeansId:
    //   insert into invoices ("userId", "coffeebeansId", date, qty, unitprice, paidship, paidtotal, cardnumber)                        values (1, 104, '2022-04-02', 2, 18.00, 7.00, ((2 * 18.00)+7.00), '3714 496353 98431') on conflict ("userId", "coffeebeansId") do nothing returning *;

    //   "userId" INTEGER REFERENCES users(id) NOT NULL,
    //   "coffeebeansId" INTEGER REFERENCES coffeebeans(id) NOT NULL,
    //   date DATE NOT NULL,
    //   qty INTEGER NOT NULL,
    //   unitprice DECIMAL(10,2) NOT NULL CHECK (unitprice >= 0), 
    //   paidship DECIMAL(10,2) NOT NULL CHECK (paidship >= 0), 
    //   paidtotal DECIMAL(10,2) NOT NULL CHECK (paidtotal >= 0), 
    //   cardnumber VARCHAR(255) NOT NULL,
    //   UNIQUE ("userId", "coffeebeansId")
    }; 
    // await addInvoice(); 
  } catch (error) { throw error; }
} //addPurchase() 


//---exports 
module.exports = { 
  addCoffeebeans,
  addUsers, 
  testDuplication,
  testInvoice
} 
