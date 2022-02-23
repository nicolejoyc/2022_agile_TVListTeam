var addEntry = new DBCreateTransaction();

document.querySelector("#addShowMovieForm").addEventListener("submit", function(e){
  // For now, added this so that the page doesn't refresh
  // but will probably want to refresh to another page later
  // to display the info that the user just submitted
  e.preventDefault(); 

  var inputTitle = document.querySelector("#title");
  var inputTvType = document.querySelector('input[name="tvType"]:checked');
  var inputGenre = document.querySelector("#genre");
  var inputLength = document.querySelector("#length");
  var inputWishList = document.querySelector("#wishlist");
  //console.log(inputTitle.value + "\n" + inputTvType.value + "\n" +
  //              inputGenre.value + "\n" + inputLength.value + "\n" +
  //              inputWishList.checked);

  // TODO: add code to validate that user added at least title
  //       and whether it's a show or movie

  // TODO: add if statement to check if movie/show 
  //       table has already been created, and if not create it??

  // Calls the sendRequest method from addEntry instance of the
  // DBCreateTransaction Class
  addEntry.sendRequest("tv", {
    id: "3", // TODO: add count method that autimatically adds another id
    title: inputTitle.value,
    tvType: inputTvType.value,
    genre: inputGenre.options[inputGenre.selectedIndex].text,
    length: inputLength.value,
    wishList: inputWishList.checked
  })

});
