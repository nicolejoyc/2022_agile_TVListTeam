/**
 * Application Shared Variables
 */
signInStorageKey = 'signIn';
usernameStorageKey = 'username';
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

// Is user signed in
isSignedIn = () => {
  return(sessionStorage.getItem(signInStorageKey) || localStorage.getItem(signInStorageKey));
};

// Get the user sign-in key
getSignedInKey = () => {
  var key;
  // Get key from session storage variable
  if((key = sessionStorage.getItem(signInStorageKey))) {
    return key;
  }
  // Get key from local storage varaible
  else if((key = localStorage.getItem(signInStorageKey))) {
    return key;
  }
  // No sign-in key available, return empty string
  return "";
};

// Update username / nickname in header & session storage
let updateHeaderUsername = ($obj, str) => {

  // Update using username form session storage
  if ((username = sessionStorage.getItem(usernameStorageKey))) {
    $obj.get(0).innerHTML = username + str;
    $obj.css("opacity", 1);
  }
  // Query for user account / profile
  else {
    // Account query response
    let usernameQueryRspHandler = (rsp) => {

      // Update user form
      if(rsp.records.length === 1) {

        // Update name information
        let username = rsp.records[0].firstName;
        if(rsp.records[0].nickname) {
          username = rsp.records[0].nickname;
        }
        if($obj) {
          $obj.get(0).innerHTML = username + str;
          $obj.css("opacity", 1);
        }
        sessionStorage.setItem(usernameStorageKey, username);
      }
    };
    // Query for user account
    let emailAddress;
    let queryTransactor = new DBQueryTransaction(usernameQueryRspHandler);
    if((emailAddress = getSignedInKey())) {
      queryTransactor.sendRequest(userAccountTableName, {
        "query": `email == "${emailAddress}"`
      });
    }
  }
};

// Build full path (absolute) URL string
buildURLString = (targetPage) => {
  var url = (window.location.href.split('/'));
  url[url.length - 1] = targetPage;
  return url.join('/');
};

// Remove sign-in state from local stroage
let removeSignInState = () => {
  sessionStorage.removeItem(signInStorageKey);
  localStorage.removeItem(signInStorageKey);
};

// Create associative array of genres
genresList = [
  "Action",
  "Animation",
  "Anime",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Historical",
  "Horror",
  "Musical",
  "Mystery",
  "Reality TV",
  "Romance",
  "Romantic Comedy",
  "Science Fiction",
  "Thriller",
  "Western"
];