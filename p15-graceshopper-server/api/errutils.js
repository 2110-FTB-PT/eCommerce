/*--------------------------------------------------------------------------------
Author:     Jesslyn Bui 
Project-15: Fitness Tracker - Guided Full Stack app  
---------------------------------------------------------------------------------*/


//---definitions 

const checkUsername = (username) => {
  if (!username) { 
    return {
      code: 400,  
      user: {}, 
      name: 'UsernameError',
      message: `Invalid username '${username}'. Accept: letters, numbers.`
    }; 
  } else return; 
} //checkUsername() 


const checkPassword = (password) => { 
  if (!password || password.length < 8) { 
    return {
      code: 400,
      user: {},
      name: 'PasswordError', 
      message: `Invalid password '${password}'. Require: 8 characters or more.`
    }; 
  } else return; 
} //checkPassword() 


const checkDuplicateUser = (user) => { 
  if (user && Object.keys(user).length > 0) {
    return {
      code: 409,
      name: 'DuplicateUser', 
      message: `This username '${user.email}' has been existed. Please sign in.`
    }; 
  } else return; 
} //checkDuplicateUser() 


const checkCredentials = (username, password) => {
  if (!username || !password) { 
    return {
      code: 400,
      name: 'MissingCredentials',
      message: `Require: username and password. Received: '${username}', '${password}'.`
    };
  } else return; 
} //checkCredentials() 


const checkExistingUser = (user) => {
  if (!user || Object.keys(user).length === 0) { 
    return { 
      code: 404,
      name: 'IncorrectUsername',
      message: `The user ${user.email} does not exist. Please register.`
    };
  } //if 
} //checkExistingUser() 


const checkAuthenticatedUser = (user) => { 
//user: id, username, hashed-password from db
  if (!user || Object.keys(user).length === 0) { 
    return {
      code: 401,
      error: 'UnauthenticatedUser',
      name: 'LoginError',
      message: 'Require: login to perform this task.'
    };
  } else return; 
} //checkAuthenticatedUser() 


const checkOwner = (creatorId, userId) => {
  if (creatorId !== userId) {
    return {
      code: 403,
      error: 'UnauthorizedUser',
      name: 'OwnerIssue',
      message: 'Require: an owner/creator to perform this task.'
    };
  } else return; 
} //checkOwner() 


const checkEmptyData = (dataobj) => { 
  if (!dataobj || Object.keys(dataobj).length === 0) { 
    return {
      code: 400,
      error: 'MissingData: No data found.',
      name: 'DataError', 
      message: `Require: data fields. Found empty '${dataobj}'`
    };  
  } else return; 
} //checkEmptyData() 


const checkDuplicateData = (dataobj) => { 
  if (dataobj && Object.keys(dataobj).length > 0) {
    return {
      code: 409,
      error: 'ExistingData: No duplication is accepted.',
      name: 'ConflictData',
      message: `Found existing ${dataobj}`
    }; 
  } else return; 
} //checkDuplicateData() 


const getMissingDataCode = () => { 
  return {
    code: 400,
    error: 'MissingData: Not sufficient ids or new data.',
    name: 'DataError', 
    message: ''
  } 
} //getMissingCode() 


const checkExistingItem = (dataobj, item, number) => { 
  if (!dataobj || Object.keys(dataobj).length === 0) { 
    return { 
      code: 404, 
      error: `NotFound: '${item}' not existed`, 
      name: 'NotFound',
      message: `Unable to find '${item} ${number}'  to perform this request`
    }   
  } else return; 
} //checkExistingData()


//---exports: for internal uses 
module.exports = { 
  checkUsername,
  checkPassword, 
  checkDuplicateUser, 
  checkCredentials, 
  checkExistingUser, 
  checkAuthenticatedUser,
  checkOwner, 
  checkEmptyData,
  checkDuplicateData, 
  checkExistingItem, 
  getMissingDataCode
} 