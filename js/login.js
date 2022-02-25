$(function() {

  let tableName = 'login';

  // Update form field with current API key
  if(!m3oKeyObj.isKeyUndefined()) {
    $('#login-m3o-key').val(m3oKeyObj.getKey());
  }

  // Process login submit
  $('#login-submit').click(function(e) {
    // Get login email and password
    let email = $('#login-email').val();
    let password = $('#login-password').val();
    let key = $('#login-m3o-key').val();

    // Check for empty fields
    if(email === "" || password === "" || key === "") {
      return;
    }

    // Did user change key
    let userKeyChange = key !== m3oKeyObj.getKey() ? true : false;
    if( userKeyChange ) {
      m3oKeyObj.m3oKey = key;
    }
   
    // Database create response handler
    queryRspHandler = (obj) => {
      // User changed the key, save the key
      if( userKeyChange ) {
        if(m3oKeyObj.isLocalKey()) {
          m3oKeyObj.setLocalKey(key);
        } else {
          m3oKeyObj.setSessionKey(key);
        }
      }
      // No error code, process normal response
      if(obj.Code === undefined) {
        console.log(JSON.stringify(obj));
        if(obj.records.length === 0) {
          console.log("no record found");
        }
        else if(obj.records[0].password !== password) {
          console.log("incorrect password");
        }
        else {
          console.log("Hurray, you're in!");
        }
      }
      // Unauthorized user, remove key from storage
      else if(obj.Status === 'Unauthorized') {
        console.log("Unauthorized: The M3O Cloud API Key is not valid!");
        m3oKeyObj.resetKey();
      }
      // Something went wrong
      else {
        console.log(obj.Status);
      }
    };
    queryTransactor = new DBQueryTransaction(queryRspHandler);

    // Send query request
    emailStr = 'email == "' + email + '"';
    queryTransactor.sendRequest(tableName, { 'query': emailStr } );
  });

});