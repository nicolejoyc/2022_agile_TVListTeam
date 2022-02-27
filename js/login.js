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
    if(confirm("Already signed in, sign out?")) {
      // Sign user out
      sessionStorage.removeItem(signInStorageKey);
      localStorage.removeItem(signInStorageKey);
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
            localStorage.setItem(signInStorageKey, `${email} is signed in.`);
          } else {
            sessionStorage.setItem(signInStorageKey, `${email} is signed in.`);
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


  /**
   * Database Create Submit Handler
   * 
   * Create a database to enable testing. When the account creation
   * feature is complete and the login is attached to the account
   * database, this code and the html submit button should be
   * removed.
   */
   $('#login-create-db').click(function(e) {

      // Initialize testin database
      createTransactor = new DBCreateTransaction();
      createTransactor.sendRequest(userAccountTableName, {
        'id': "1",
        'email': "skukuk1@student.cvtc.edu",
        'password': 'samantha'
      });
      createTransactor.sendRequest(userAccountTableName, {
        'id': "2",
        'email': "blind1@student.cvtc.edu",
        'password': 'brian'
      });
      createTransactor.sendRequest(userAccountTableName, {
        'id': "3",
        'email': "ncrumbaker@student.cvtc.edu",
        'password': 'nicole'
      });
      createTransactor.sendRequest(userAccountTableName, {
        'id': "4",
        'email': "rvalien@student.cvtc.edu",
        'password': 'richard'
      });
   });
});