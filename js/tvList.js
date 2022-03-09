$(function() {

  /**
   * Redirect to login page when user is not signed in.
   */
  if(!(sessionStorage.getItem(signInStorageKey)) && !(localStorage.getItem(signInStorageKey))) {
    location.assign('login.html');
  } else {
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


