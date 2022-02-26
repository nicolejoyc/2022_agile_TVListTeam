m3oKey = "";

// for each record in the array, create a div and display
// each field from the record inside the div
function displayRecords(recordList) {

  recordList.forEach(record => {
    
    recordDiv = document.createElement("div");

    for (const field in record) {
      
      fieldParagraph = document.createElement("p");
      fieldText = document.createTextNode(field + ": " + record[field]);
      fieldParagraph.appendChild(fieldText);

      recordDiv.appendChild(fieldParagraph);

    }

    if (record.wishList === "false") {
      recordContainer = document.querySelector("#watch-list");
    } else {
      recordContainer = document.querySelector("#wish-list");
    }
    recordContainer.appendChild(recordDiv);

  });

}

$(function() {

  queryRspHandler = (obj) => {
    // put the array of records from the tvlist table
    // into a variable
    records = obj.records;
    console.log(records);

    // call function to display the records
    displayRecords(records);
  };

  var queryTransactor = new DBQueryTransaction(queryRspHandler);

  // return all records from tvlist
  queryTransactor.sendRequest('tvlist', {});


});