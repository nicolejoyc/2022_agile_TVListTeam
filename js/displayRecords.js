// for each record in the array, create a div and display
// each field from the record inside the div
function displayRecords(recordList) {

  recordList.forEach(record => {

    lineBreak = document.createElement("br");
    
    recordDiv = document.createElement("div");

    // function to loop the fields in the Map created below
    // only appends filled fields to the recordDiv
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

    // if the wishList field is true, append to wish-list div
    // else append it to the watch-list div
    if (record.wishList) {
      recordContainer = document.querySelector("#wish-list");
    } else {
      recordContainer = document.querySelector("#watch-list");
    }
    recordContainer.appendChild(recordDiv);
    // recordContainer.appendChild(lineBreak);

  });

}

$(function() {

  queryRspHandler = (obj) => {
    // put the array of records from the tvlist table
    // into a variable
    records = obj.records;

    // call function to display the records
    displayRecords(records);
  };

  var queryTransactor = new DBQueryTransaction(queryRspHandler);

  // return all records from tvlist
  queryTransactor.sendRequest('tvlist', {});


});