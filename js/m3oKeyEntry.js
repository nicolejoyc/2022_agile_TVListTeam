$(function() {

  $('#m3o-key-input').val(m3oKeyObj.getKey());

  $('#m3o-key-save').click((e) => {

    // Retrieve form input
    let inputKey = $('#m3o-key-input').val();
    let rememberKey = $('#m3o-key-remember').is(":checked");

    m3oKeyObj.resetKey();
    // Save local
    if(rememberKey) {
      m3oKeyObj.setLocalKey(inputKey);
    }
    // Save session
    else {
      m3oKeyObj.setSessionKey(inputKey);
    }

    let m3oRspHandler = (rsp) => {
        // Check M3O response
        if(rsp.detail !== undefined) {
            // Key is unauthorized
            if(rsp.detail === 'Unauthorized') {
              $('#m3o-key-error-message').text("Key is not authorized, please try again!");
              $('#m3o-key-input').css('border', "2px solid red");
            }
            // Some other error ??
            else {
              $('#m3o-key-error-message').text("Sorry, an error occurred, please try again!");
              console.log(rsp);
            }
            m3oKeyObj.resetKey();
        } else {
            // Key works, go home
            window.location.assign('index.html');
        }
    };
    // Try using the entered key to validate cloud access
    listTablesTransactor = new DBListTablesTransaction(m3oRspHandler);
    listTablesTransactor.sendRequest();
  });

  $('#m3o-key-clear-entry').click((e) => {
    window.location.reload();
  });

});