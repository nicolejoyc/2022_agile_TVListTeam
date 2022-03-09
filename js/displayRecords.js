var acctId;

// for each record in the array, create a div and display
// each field from the record inside the div
function displayRecords(recordList) {

  recordList.forEach(record => {
    
    var recordDiv = document.createElement("div");

    // link tags to hold link to edit or delete record
    var recordEdit = document.createElement("a");
    var editText = document.createTextNode("Edit " + record.showOrMovie);
    recordEdit.appendChild(editText);

    var recordDelete = document.createElement("a");
    var deleteText = document.createTextNode("Delete " + record.showOrMovie);
    recordDelete.appendChild(deleteText);


    // function to loop the fields in the Map created below;
    // only appends filled fields to the recordDiv.
    function loopFields(value, key) {
      
      if (value !== "") {

        fieldParagraph = document.createElement("p");
        fieldSpan = document.createElement("span");
        spanText = document.createTextNode(key + ":");
        fieldSpan.appendChild(spanText);
        fieldParagraph.appendChild(fieldSpan);
        // For the "Viewed" field, true should be displayed as
        // "Yes" and false as "No"
        if (key === "Viewed") {
          if (value) {
            paragraphText = document.createTextNode(" Yes");
          } else {
            paragraphText = document.createTextNode(" No");
          }
        } else {
          paragraphText = document.createTextNode(" " + value);
        }
        fieldParagraph.appendChild(paragraphText);
  
        recordDiv.appendChild(fieldParagraph);
      }

    }

    // Create new Map (like associative array) that
    // has the fields in the correct order and with better
    // descriptors
    new Map([
      ['Title', record.title],
      ['Multimedia Type', record.showOrMovie],
      ['Genre', record.genre],
      ['Release Year', record.releaseYear],
      ['Director', record.director],
      ['Length (minutes)', record.length],
      ['Viewed', record.viewed],
      ['Personal Rating', record.rating],
    ]).forEach(loopFields);

    // Set the id and href of delete and edit links
    recordEdit.setAttribute("id", "editRecord" + record.id);
    recordEdit.setAttribute("href", buildURLString("editShowMovie.html"));
    recordDelete.setAttribute("id", "deleteRecord" + record.id);
    recordDelete.setAttribute("href", "#");

    // Append edit and delete links to div
    recordDiv.appendChild(recordEdit);
    recordDiv.appendChild(recordDelete);

    // if the wishlist field is true, append to wish-list div
    // else append it to the watch-list div
    if (record.wishlist) {
      recordContainer = document.querySelector("#wish-list");
    } else {
      recordContainer = document.querySelector("#watch-list");
    }
    recordContainer.appendChild(recordDiv);

  });

}


function deleteRecord(recordID) {
  deleteRspHandler = (obj) => {
    location.assign("index.html");
  };

  var deleteTransactor = new DBDeleteTransaction(deleteRspHandler);

  deleteTransactor.sendRequest('tvlist', recordID);
}


function listenForEditDelete(recordList) {

  recordList.forEach(record => {

    // add an event listener for the onclick of the edit link
    // id of edit link will be ("#editRecord" + record.id)
    document.querySelector("#editRecord" + record.id).addEventListener("click", function() {

      // add the id of the clicked item to a session storage variable
      sessionStorage.setItem("editRecordID", record.id);

    });

    // add an event listener for the onlick of the delete link
    // id of delete link will be (#"deleteRecord" + record.id)
    document.querySelector("#deleteRecord" + record.id).addEventListener("click", function() {
      deleteRecord(record.id);
    });

  });

}

queryRspHandler = (obj) => {
  // put the array of records from the tvlist table
  // into a variable
  records = obj.records;

  // call function to display the records
  displayRecords(records);
  listenForEditDelete(records);
};

// User Account Record Query Response Handler
var queryAccountRspHandler = (obj) => {

  // Update user form
  if(obj.records.length === 1) {

    // Save the record id
    id = obj.records[0].id;

    var queryTransactor = new DBQueryTransaction(queryRspHandler);

    // return all records from tvlist
    queryTransactor.sendRequest('tvlist', {
      "query": `accountId == "${id.toString()}"`
    });

  } else {
    alert("Sorry, no account found.");
    console.log("Account query, records found: " + rsp.records.length);
  }
};

// // Query for user account
// // Moved to tvList so it is only loaded if user is signed in

// var emailAddress;
// var queryAccountTransactor = new DBQueryTransaction(queryAccountRspHandler);
// if((emailAddress = getSignedInKey())) {
//   queryAccountTransactor.sendRequest(userAccountTableName, {
//     "query": `email == "${emailAddress}"`
//   });
// }