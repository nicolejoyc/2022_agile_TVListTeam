$(function() {

  /**
   * M3O Cloud Service Access
   * 
   * Check whether a M3O Cloud Service key has been saved for this
   * application. If a key is not present, user must enter
   * their access key.
   */
   if(m3oKeyObj.isKeyUndefined()) {
    location.assign('m3oKeyEntry.html');
  }

  /**
   * Redirect to login page when user is not signed in.
   */
  else if(!isSignedIn()) {
    location.assign('login.html');
  }

  /**
   * User is signed in, proceed!
   */
  else {
    // Instantiate the header drop-down menu
    var dropDownMenu = new DropDownMenu($('#dd-menu'));
    // Update drop-down title to user email address
    $('#dd-menu span').get(0).innerHTML = getSignedInKey();

    // Collapse drop-down menu on document click
    $(document).click(function() {
      $('.wrapper-dropdown').removeClass('active');
    });

    // Personalize header
    updateHeaderUsername($('div.header-center h1'), "'s TV List");

    // Query for user account
    var emailAddress;
    var queryAccountTransactor = new DBQueryTransaction(queryAccountRspHandler);
    if((emailAddress = getSignedInKey())) {
      queryAccountTransactor.sendRequest(userAccountTableName, {
        "query": `email == "${emailAddress}"`
      });
    }

    initCarousel();
  }
  
});


