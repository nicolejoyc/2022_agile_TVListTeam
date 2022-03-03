$(function() {

  /**
   * M3O Cloud Service Access
   * 
   * Check whether a M3O Cloud Service key has been saved for this
   * application. If a key is not present, allow the user to enter
   * their access key.
   */
  if(m3oKeyObj.isKeyUndefined()) {
    updateM3oKey();
  }

  /**
   * Already Signed In
   */
  if(sessionStorage.getItem(signInStorageKey) || localStorage.getItem(signInStorageKey)) {

    // Sign out from welcome page?
    if(window.location.search.search("signout") >= 0) {
      removeSignInState();
    }
    else if(confirm("Already signed in, sign out?")) {
      removeSignInState();
    }
    // Stay signed-in, redirect to previous page
    else {
      window.history.back();
    }
  }

  /**
   * Login Form Submit Handler
   */
  $('#login-submit').click(function(e) {

    // Retrieve form input
    let email = $('#login-email').val();
    let password = $('#login-password').val();
    
    // Empty fields?
    if(email === "" || password === "") {
      return;
    }
    e.preventDefault();

    /**
     * Database Query Response Handler
     */
    queryRspHandler = (obj) => {

      var newURL = 'login.html';
      // Error code is not present
      if(obj.Code === undefined) {
        // Email address not found
        if(obj.records.length === 0) {
          alert("Email address not found");
          if(confirm("Would you like to sign up?")) {
            newURL = 'accountCreation.html';
          }
        }
        // Password doesn't match
        else if(obj.records[0].password !== password) {
          alert("Incorrect password");
        }
        // Sign-in success!
        else {
          alert("You are now signed-in!");
          if(m3oKeyObj.isLocalKey()) {
            localStorage.setItem(signInStorageKey, `${email}`);
          } else {
            sessionStorage.setItem(signInStorageKey, `${email}`);
          }
          newURL = 'index.html';
        }
      }
      // Unauthorized key, prompt to update
      else if(obj.Status === 'Unauthorized') {
        alert("Unauthorized M3O Cloud API Key, please enter valid key");
        updateM3oKey();
      }
      // Unknown error
      else {
        alert(`ERROR:${obj.Status}`);
      }
      // Redirect to URL
      window.location.assign(newURL);
    };
    // Send query request for user email address
    queryTransactor = new DBQueryTransaction(queryRspHandler);
    queryTransactor.sendRequest(userAccountTableName, { 'query': `email == "${email}"` } );
    return false;
  });

  /**
   * Update M30 Cloud Service Key Handler
   */
  $('#login-update-key').click(function(e) {
    updateM3oKey();
  });

});