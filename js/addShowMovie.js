// This js file is for the addShowMovie html page.
// It allows for users to be able to enter in one
// one show/movie at a time, and then they will
// be redirected to the home page to see their record(s)

// global account id variable
var acctId;
let addTitle = document.querySelector("#title");


// Prevents duplicate titles, but can be overidden incase of movie remakes.
function confirmAdd() {
  let text = "That movie title you entered was already found in the database. Did you want to add it again? If so click ok " ;
  if (confirm(text) === true) {
   return true;
  } 
  document.getElementById("add-show-movie-form").reset();
  return false;
}

// Function that returns the correct rating
// prevents adding a rating to a movie that has not been viewed
function getInputRating() {
  if (document.querySelector("#viewed").checked) {
    return document.querySelector("#rating").value;
  } else {
    return "";
  }
}

function addShowMovie(recordID) {
  // This is what happens after the new movie/show record is added
  createRspHandler = (obj) => {
    location.assign(buildURLString("index.html"));
  };

  var createTransactor = new DBCreateTransaction(createRspHandler);

  let inputTitle = document.querySelector("#title");
  let inputShowOrMovie = document.querySelector('input[name="show-or-movie"]:checked');
  let inputDirector = document.querySelector("#director");
  var inputReleaseYear = document.querySelector("#release-year");
  // Created variables for drop down genre, and other genre, which
  // is the text box.
  var inputSelectedGenre = document.querySelector("#genre");
  var inputOtherGenre = document.querySelector("#other-txt");
  var inputLength = document.querySelector("#length");
  var inputViewed = document.querySelector("#viewed");
  var inputWishlist = document.querySelector("#wishlist");

  // check if the "other" option is selected
  // if it's selected, inputGenre should be the input from 
  // the "Other" text box, otherwise inputGenre should be 
  // the value from the drop down list 
  function getInputGenre() {
    if (inputSelectedGenre.options[inputSelectedGenre.selectedIndex].text === "Other") { // Selected only "Other"
      return inputOtherGenre.value;
    } else { // Selected at least one option that was not "Other"

      // String that will be built by adding each selected genre
      var genres = "";
      for (var option of inputSelectedGenre.options)
      {
        if (option.selected) { // if option is selected, add it to genres String UNLESS the option is "Other"
          if (option.text !== "Other") {
            if (genres === "") {
              genres += option.text;
            } else {
              genres += ", " + option.text;
            }
          }
        }
      }

      return genres;
    }
  }

  // Calls the sendRequest method from createTransactor instance of the
  // DBCreateTransaction Class
  createTransactor.sendRequest("tvlist", {
    id: recordID,
    accountId: acctId.toString(),
    title: inputTitle.value,
    showOrMovie: inputShowOrMovie.value,
    director: inputDirector.value,
    releaseYear: inputReleaseYear.value,
    genre: getInputGenre(),
    length: inputLength.value,
    viewed: inputViewed.checked,
    wishlist: inputWishlist.checked,
    rating: getInputRating(),
    dateAdded: new Date().toISOString().slice(0, 10)
  });

} // end addShowMovie function

// Event listener for detecting when the genre selection is changed
// this way, I can display the "other genre" textbox if their selection
// is "Other"
document.querySelector("#genre").addEventListener("change", function(e) {

  if (this.options[this.selectedIndex].text === "Other") {
    document.querySelector("#other-txt").style.display = "inline";
    document.querySelector("#other-lbl").style.display = "inline";
  } else {
    document.querySelector("#other-txt").style.display = "none";
    document.querySelector("#other-lbl").style.display = "none";
  }

});

// Event listener for detecting if the user checks the "viewed" box
// if so, the rating div should appear
document.querySelector("#viewed").addEventListener("change", function(e) {
  if (this.checked) {
    document.querySelector("#rating-div").style.display = "block";
  } else {
    document.querySelector("#rating-div").style.display = "none";
  }

});

// Set paragraph next to rating to 0, then add event listener
// to detect when value changes and update paragraph with new value
var currentRating = document.querySelector("#current-rating");
var ratingSlider = document.querySelector("#rating");
currentRating.innerHTML = ratingSlider.value;

ratingSlider.addEventListener("input", function(e) {
  currentRating.innerHTML = ratingSlider.value;
});


// Event listener for the form submit
document.querySelector("#add-show-movie-form").addEventListener("submit", function(e) {
  e.preventDefault(); 

  // user should choose at least one between the "Viewed" and "Wishlist" checkbox
  // they can choose both, but if they select neither, it doesn't make sense
  function viewedOrWishlistSelected() {
    if (document.querySelector("#viewed").checked || document.querySelector("#wishlist").checked) {
      return true;
    } else {
      alert("Viewed or Wishlist? - Please select at least one.");
      return false;
    }
  }

  // check if movie/show table has already been created
  // if created => set id to 1 more than the current highest id
  // if not created => set id to 1

  // Response handler to manipulate the returned info
  listTablesRspHandler = (obj) => {
    var newRecordID = "";
    tables = obj.tables;

    function tblExists(table) {
      return table === 'tvlist';
    }

    if (tables.find(tblExists) === 'tvlist') { 
      
      // table exists, check for duplicate titles, if 
      //none exist, then proceed to find the highest id in table and add one
      queryRspHandler = (obj) => {
        var records = obj.records;
        records.forEach(record => {
          if (record.accountId === acctId && record.title === addTitle.value) {
            confirmAdd();
          } 
        });
        // sets the newRecordID to one plus the id of the current
        // record with the highest id
        // this way, even if a record between the lowest and highest
        // id is deleted, the next stored id will still be accurate
        var highestID = 0;

        // search through records to find record with highest id
        records.forEach(record => {
          if (Number(record.id) > highestID) {
            highestID = Number(record.id);
          }
        });

        newRecordID = (highestID + 1).toString();

        addShowMovie(newRecordID);
      };

      var queryTransactor = new DBQueryTransaction(queryRspHandler);

      // sends a request to query the tvlist data, limit 1000 so we get max possible records
      queryTransactor.sendRequest('tvlist', {
        table: "tvlist",
        limit: 1000,
      });

    } else { // table does not exist, so set first record to id of 1
      newRecordID = "1";

      addShowMovie(newRecordID);
    }
  };

  var listTablesTransactor = new DBListTablesTransaction(listTablesRspHandler);

  if (viewedOrWishlistSelected()) {
    listTablesTransactor.sendRequest();
  }

});

// User Account Record Query Response Handler
var queryAccountRspHandler = (obj) => {

  // Update user form
  if(obj.records.length === 1) {

    // Save the record id
    acctId = obj.records[0].id;

  } else {
    alert("Sorry, no account found.");
    console.log("Account query, records found: " + obj.records.length);
    removeSignInState();
    window.location.reload();
  }
};

// Query for user account
var emailAddress;
var queryAccountTransactor = new DBQueryTransaction(queryAccountRspHandler);
if((emailAddress = getSignedInKey())) {
  queryAccountTransactor.sendRequest(userAccountTableName, {
    "query": `email == "${emailAddress}"`
  });
}

$(function() {

  /**
   * Redirect to login page when user is not signed in.
   */
  if(!isSignedIn()) {
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

  }
  
});