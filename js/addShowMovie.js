async function postData(action = '', data = {}) {
  // Default options are marked with *
  const response = await fetch("https://api.m3o.com/v1/db/" + action, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '' // TODO : add public authorization key here
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

document.querySelector("#addShowMovieForm").addEventListener("submit", function(e){

  // For now, added this so that the page doesn't refresh
  // but will probably want to refresh to another page later
  // to display the info that the user just submitted
  e.preventDefault(); 

  // Calls the postData function with the "create" action which allows to 
  // add a record to the database
  postData("Create", { record: {
    // TODO add record info
  }, table: '' })   // TODO: add table name
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
});

