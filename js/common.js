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

// Is user signed in
isSignedIn = () => {
  return(sessionStorage.getItem(signInStorageKey) ||  localStorage.getItem(signInStorageKey));
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