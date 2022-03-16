$(function() {

  // Always sign out
  removeSignInState();

  // Check for M3O access key
  if(m3oKeyObj.isKeyUndefined()) {
      // Key not present, redirect home.
      window.location.assign('index.html');
  }

  // Load current M3O Key
  $('#m3o-key-input').val(m3oKeyObj.getKey());

  /**
   * Login Form Submit Handler
   */
  $('#login-submit').click(function(e) {

      // Retrieve form input
      let email = $('#login-email').val();
      let password = $('#login-password').val();
      let remember = $('#login-remember').is(":checked");
      
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

          // Check for error code presence
          if(obj.code === undefined) {

              // User account not found
              if(obj.records.length === 0) {
                  $('#login-email-error-message').css('display', "block");
                  $('#login-email').css('border', "2px solid red");
                  return true;
              }
              // Password doesn't match DB record
              else if(obj.records[0].password !== password) {
                $('#login-password-error-message').css('display', "block");
                $('#login-password').css('border', "2px solid red");
                return true;
              }
              // Sign-in success!
              else {
                  if(remember) {
                      localStorage.setItem(signInStorageKey, `${email}`);
                  } else {
                      sessionStorage.setItem(signInStorageKey, `${email}`);
                  }
                  newURL = 'index.html';
              }
          }
          // Unauthorized key, prompt to update
          else if(obj.status === 'Unauthorized') {
              alert("Unauthorized M3O Cloud Key");
              m3oKeyObj.resetKey();
          }
          // Unknown error
          else {
              alert(`ERROR:${obj.status}`);
          }
          // Redirect to URL
          window.location.assign(newURL);
      };
      // Send query request for user email address
      queryTransactor = new DBQueryTransaction(queryRspHandler);
      queryTransactor.sendRequest(userAccountTableName, { 'query': `email == "${email}"` } );
      return false;
  });

  // Update email entry appearance to normal
  $('#login-email').change(function(e) {
      if($('#login-email-error-message').css('display') === "block") {
          $('#login-email-error-message').css('display', "none");
          $('#login-email').css('border', "1px solid #f68712");
      }
  });

  // Reset M3O key, redirect home
  $('#m3o-key-reset').click(function(e) {
      m3oKeyObj.resetKey();
      window.location.assign('index.html');
  });

});