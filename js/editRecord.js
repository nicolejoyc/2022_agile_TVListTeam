// initialize and assign variables of the html elements for use in functions
var inputTitle = document.querySelector("#title");
var inputShowOrMovie = document.querySelector('input[name="show-or-movie"]:checked');
var inputSelectedGenre = document.querySelector("#genre");
var inputOtherGenre = document.querySelector("#other-txt");
var inputDirector = document.querySelector("#director");
var inputReleaseYear = document.querySelector("#release-year");
var inputLength = document.querySelector("#length");
var inputViewed = document.querySelector("#viewed");
var inputWishlist = document.querySelector("#wishlist");

function displayOtherGenre() {
  document.querySelector("#other-txt").style.display = "inline";
  document.querySelector("#other-lbl").style.display = "inline";
}

function hideOtherGenre() {
  document.querySelector("#other-txt").style.display = "none";
  document.querySelector("#other-lbl").style.display = "none";
}

function loadRecord(record) {

  // set html elements to hold record info
  inputTitle.value = record.title;
  document.querySelector('#' + (record.showOrMovie).toLowerCase()).checked = true;
  inputDirector.value = record.director;
  inputReleaseYear.value = record.releaseYear;

  // genres might be a list of genres, so split it
  genreArray = record.genre.split(", ");

  // this makes sure the dropdown or "other genre" text box
  // is filled if there is a genre stored in the record.
  // otherwise, it sets it to the default (app an option)

  if (genresList.includes(genreArray[0])) {
    // if the first item in genreArray is an option other than "Other",
    // go through genreArray to fill the dropdown with the selected options
    $.each(genreArray, function(i,e){
      $("#genre option[value='" + e.toLowerCase().replace(/\s/g, '') + "']").prop("selected", true);
    });
  } else if (genreArray[0] === "") {
    inputSelectedGenre.value = "";
  } else {
    inputSelectedGenre.value = "other";
    inputOtherGenre.value = record.genre;
  }

  inputLength.value = record.length;
  inputViewed.checked = record.viewed;
  inputWishlist.checked = record.wishlist;

  // initially check if the rating should be shown or not
  if (document.querySelector("#viewed").checked) {
    document.querySelector("#rating-div").style.display = "block";
    document.querySelector("#rating").value = record.rating;
  } else {
    document.querySelector("#rating-div").style.display = "none";
    document.querySelector("#rating").value = "";
  }

  if (inputSelectedGenre.options[inputSelectedGenre.selectedIndex].text === "Other") {
    displayOtherGenre();
  } else {
    hideOtherGenre();
  }

}


function editRecord(record) {

  // Function that returns the correct rating
  // prevents adding a rating to a movie that has not been viewed
  function getInputRating() {
    if (document.querySelector("#viewed").checked) {
      return document.querySelector("#rating").value;
    } else {
      return "";
    }
  }

  // check if the "other" option is selected
  // if it's selected, return the input from 
  // the "Other" text box, otherwise return 
  // the value from the drop down list 
  function getInputGenre() {
    if (inputSelectedGenre.options[inputSelectedGenre.selectedIndex].text === "Other") {
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

  function updateShowMovie() {
    
    updateRspHandler = (obj) => {
      location.assign(buildURLString("index.html"));
    };
  
    var updateTransactor = new DBUpdateTransaction(updateRspHandler);

    updateTransactor.sendRequest('tvlist', {
      id: record.id,
      title: inputTitle.value,
      // for some reason, the inputShowOrMovie variable was returning null,
      // so below I just selected the element again
      showOrMovie: document.querySelector('input[name="show-or-movie"]:checked').value,
      director: inputDirector.value,
      releaseYear: inputReleaseYear.value,
      genre: getInputGenre(),
      length: inputLength.value,
      viewed: inputViewed.checked,
      wishlist: inputWishlist.checked,
      rating: getInputRating(),
    });

  }

  // Event listener for detecting when the genre selection is changed
  // this way, I can display the "other genre" textbox if their selection
  // is "Other"
  document.querySelector("#genre").addEventListener("change", function(e) {

    if (this.options[this.selectedIndex].text === "Other") {
      displayOtherGenre();
    } else {
      hideOtherGenre();
    }

  });

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

  // listen for the form submit
  document.querySelector("#edit-show-movie-form").addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    updateShowMovie();
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

    // get the clicked ID from index.html
    var editID = sessionStorage.getItem("editRecordID");

    readRspHandler = (obj) => {
        record = obj.records[0];

        // call loadRecord to fill in html elements
        loadRecord(record);
        // call editRecord with the single record
        editRecord(record);
    };

    var readTransactor = new DBReadTransaction(readRspHandler);

    // return record with clicked ID
    readTransactor.sendRequest('tvlist', editID);

  }
});