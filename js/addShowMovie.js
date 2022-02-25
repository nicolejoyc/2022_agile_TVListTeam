m3oKey = "NzZjMGM4ZjYtYmUyOC00NTFmLWIzYjEtNjY2NjEyMjIwYmRl";

function addShowMovie(recordID) {
  var createTransactor = new DBCreateTransaction();

  var inputTitle = document.querySelector("#title");
  var inputShowOrMovie = document.querySelector('input[name="showOrMovie"]:checked');
  var inputDirector = document.querySelector("#director");
  var inputReleaseYear = document.querySelector("#releaseYear");
  // Created variables for drop down genre, and other genre, which
  // is the text box.
  // inputGenre will be assigned below
  var inputSelectedGenre = document.querySelector("#genre");
  var inputOtherGenre = document.querySelector("#otherTxt");
  var inputGenre = "";
  var inputLength = document.querySelector("#length");
  var inputViewed = document.querySelector("#viewed");
  var inputWishList = document.querySelector("#wishlist");

  // check if the "other" option is selected
  // if it's selected, inputGenre should be the input from 
  // the "Other" text box, otherwise inputGenre should be 
  // the value from the drop down list 
  if (inputSelectedGenre.options[inputSelectedGenre.selectedIndex].text === "Other") {
    inputGenre = inputOtherGenre.value;
  } else {
    inputGenre = inputSelectedGenre.options[inputSelectedGenre.selectedIndex].text;
  }

  // Calls the sendRequest method from createTransactor instance of the
  // DBCreateTransaction Class
  createTransactor.sendRequest("tvlist", {
    id: recordID,
    title: inputTitle.value,
    showOrMovie: inputShowOrMovie.value,
    director: inputDirector.value,
    releaseYear: inputReleaseYear.value,
    genre: inputGenre,
    length: inputLength.value,
    viewed: inputViewed.checked,
    wishList: inputWishList.checked,
    rating: getInputRating()
  });

} // end addShowMovie function

// Function that returns the correct rating
// prevents adding a rating to a movie that has not been viewed
function getInputRating() {
  if (document.querySelector("#viewed").checked) {
    return document.querySelector("#rating").value;
  } else {
    return "";
  }
}

// Event listener for detecting when the genre selection is changed
// this way, I can display the "other genre" textbox if their selection
// is "Other"
document.querySelector("#genre").addEventListener("change", function(e) {

  if (this.options[this.selectedIndex].text === "Other") {
    document.querySelector("#otherTxt").style.display = "inline";
    document.querySelector("#otherLbl").style.display = "inline";
  } else {
    document.querySelector("#otherTxt").style.display = "none";
    document.querySelector("#otherLbl").style.display = "none";
  }

});

// Event listener for detecting if the user checks the "viewed" box
// if so, the rating div should appear
document.querySelector("#viewed").addEventListener("change", function(e) {
  if (this.checked) {
    document.querySelector("#ratingDiv").style.display = "block";
  } else {
    document.querySelector("#ratingDiv").style.display = "none";
  }

});

// Set paragraph next to rating to 0, then add event listener
// to detect when value changes and update paragraph with new value
var currentRating = document.querySelector("#currentRating");
var ratingSlider = document.querySelector("#rating");
currentRating.innerHTML = ratingSlider.value;

ratingSlider.addEventListener("input", function(e) {
  currentRating.innerHTML = ratingSlider.value;
});


// Event listener for the form submit
document.querySelector("#addShowMovieForm").addEventListener("submit", function(e){
  // For now, added this so that the page doesn't refresh
  // but will probably want to refresh to another page later
  // to display the info that the user just submitted
  e.preventDefault(); 

  // validate that user added at least title
  // and whether it's a show or movie
  function validateInput() {
    if (document.querySelector("#title").value === "") {
      alert("Please enter a title.")
      return false;
    } else if (document.querySelector('input[name="showOrMovie"]:checked') === null) {
      alert("Please specify whether your entry is a show or movie.")
      return false;
    } else {
      return true;
    }
  }

  // check if movie/show table has already been created
  // if created => determine next id
  // if not created => set id of the first record to one more than the
  // greatest id

  // Response handler to manipulate the returned info
  listTablesRspHandler = (obj) => {
    var newRecordID = "";
    tables = obj['tables'];

    function tblExists(table) {
      return table === 'tvlist';
    }

    if (tables.find(tblExists) === 'tvlist') {
      // table exists, so find highest id in table and add one

      queryRspHandler = (obj) => {
        records = obj['records'];

        // sets the newRecordID to one plus the id of the current
        // record with the highest id
        // this way, even if a record between the lowest and highest
        // id is deleted, the next stored id will still be accurate
        newRecordID = (Number(records[0].id) + 1).toString();

        addShowMovie(newRecordID);
      };

      var queryTransactor = new DBQueryTransaction(queryRspHandler);

      // sends a request to query the tvList data to only return the
      // record with the highest id (id desc)
      queryTransactor.sendRequest('tvlist', {
        table: "tvlist",
        limit: 1,
        orderBy: "id",
        order: "desc"
      });

    } else {
      // table does not exist, so set first record to id of 1
      newRecordID = "1";

      // Calls the sendRequest method from createTransactor instance of the
      // DBCreateTransaction Class
      addShowMovie(newRecordID);
    }
  };

  var listTablesTransactor = new DBListTablesTransaction(listTablesRspHandler);

  if (validateInput()) {
    listTablesTransactor.sendRequest();
  }

});
