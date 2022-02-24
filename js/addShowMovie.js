m3oKey = "";

var createTransactor = new DBCreateTransaction();

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

})

// Event listener for the form submit
document.querySelector("#addShowMovieForm").addEventListener("submit", function(e){
  // For now, added this so that the page doesn't refresh
  // but will probably want to refresh to another page later
  // to display the info that the user just submitted
  e.preventDefault(); 

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
  //console.log(inputTitle.value + "\n" + inputshowOrMovie.value + "\n" +
  //              inputGenre.value + "\n" + inputLength.value + "\n" +
  //              inputWishList.checked);

  // TODO: add code to validate that user added at least title
  //       and whether it's a show or movie

  // TODO: check if the "other" option is selected
  //       if it's selected, inputGenre should be the input from 
  //       the "Other" text box, otherwise inputGenre should be 
  //       the value from the drop down list 
  if (inputSelectedGenre.options[inputSelectedGenre.selectedIndex].text === "Other") {
    inputGenre = inputOtherGenre.value;
  } else {
    inputGenre = inputSelectedGenre.options[inputSelectedGenre.selectedIndex].text;
  }

  // check if movie/show table has already been created
  // if created => determine next id
  // if not created => set id of the first record to one more than the
  // greatest id
  var newRecordId = "";

  // Response handler to manipulate the returned info
  listTablesRspHandler = (obj) => {
    tables = obj['tables'];

    function tblExists(table) {
      return table === 'tvlist';
    }

    if (tables.find(tblExists) === 'tvlist') {
      // table exists, so find highest id in table and add one

      queryRspHandler = (obj) => {
        records = obj['records'];

        // sets the newRecordId to one plus the id of the current
        // record with the highest id
        // this way, even if a record between the lowest and highest
        // id is deleted, the next stored id will still be accurate
        newRecordId = Number(records[0].id) + 1;
      };

      var queryTransactor = new DBQueryTransaction(null, queryRspHandler);

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
      newRecordId = "1";
    };
  };

  var listTablesTransactor = new DBListTablesTransaction(null, listTablesRspHandler);

  listTablesTransactor.sendRequest();

  // Calls the sendRequest method from createTransactor instance of the
  // DBCreateTransaction Class
  createTransactor.sendRequest("tvlist", {
    id: newRecordId, // TODO: adds record, but is currently not setting newRecordId above
    title: inputTitle.value,
    showOrMovie: inputShowOrMovie.value,
    director: inputDirector.value,
    releaseYear: inputReleaseYear.value,
    genre: inputGenre,
    length: inputLength.value,
    viewed: inputViewed.checked,
    wishList: inputWishList.checked
  })
});
