$(function() {

  /**
   * Redirect to login page when user is not signed in.
   */
  if(!(sessionStorage.getItem(signInStorageKey)) && !(localStorage.getItem(signInStorageKey))) {
    location.assign('login.html');
  }
  
});


