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

function loadRecord(record) {

  // set html elements to hold record info
  inputTitle.value = record.title;
  document.querySelector('#' + (record.showOrMovie).toLowerCase()).checked = true;
  inputDirector.value = record.director;
  inputReleaseYear.value = record.releaseYear;
  inputSelectedGenre.value = record.genre.toLowerCase();
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
    } else {
      return inputSelectedGenre.options[inputSelectedGenre.selectedIndex].text;
    }
  }

  function updateShowMovie() {
    
    updateRspHandler = (obj) => {
      location.assign("https://nicolejoyc.github.io/2022_agile_TVListTeam/index.html");
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

  document.querySelector("#viewed").addEventListener("change", function(e) {
    if (this.checked) {
      document.querySelector("#rating-div").style.display = "block";
    } else {
      document.querySelector("#rating-div").style.display = "none";
    }
  });

  // listen for the form submit
  document.querySelector("#edit-show-movie-form").addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    updateShowMovie();
  });

}


$(function() {

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

});