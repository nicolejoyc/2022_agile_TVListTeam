/**
 * Application Shared Variables
 */
signInStorageKey = 'signIn';
userAccountTableName = 'useraccount';

/**
 * M3O Cloud Key Update
 * 
 * Provide a series of pop-up dialogs to allow user to
 * update their M3O Cloud Services access key.
 */
updateM3oKey = () => {
  // Get M3O Key from user
  if(!(m3oKey = window.prompt("Please Enter M3OKey:", ""))) {
    return;
  }
  m3oKeyObj.resetKey();
  // Rember key on this computer, save local
  if(window.confirm("Remember key on this computer?")) {
    m3oKeyObj.setLocalKey(m3oKey);
  }
  // Do not remember key, save session
  else {
    m3oKeyObj.setSessionKey(m3oKey);
  }
};