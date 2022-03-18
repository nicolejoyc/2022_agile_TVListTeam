function confirmDelete() {
  let text = "Are you sure you want to Delete your account?";
  if (confirm(text) === true) {
   return true;
  } 
  return false;
}

var acctId;

// for each record in the array, create a div and display
// each field from the record inside the div
function displayRecords(recordList) {

  recordList.forEach(record => {
    
    var recordDiv = document.createElement("div");

    // link tags to hold link to edit or delete record
    var recordEdit = document.createElement("a");
    var editText = document.createTextNode("Edit");
    recordEdit.appendChild(editText);
    var recordDelete = document.createElement("a");
    var deleteText = document.createTextNode("Delete");
    recordDelete.appendChild(deleteText);


    // function to loop the fields in the Map created below;
    // only appends filled fields to the recordDiv.
    function loopFields(value, key) {  
      if (value !== "") {
        fieldParagraph = document.createElement("p");
        paragraphText = document.createTextNode(value);
        fieldSpan = document.createElement("span");
        spanText = document.createTextNode(key + ":");
        fieldSpan.appendChild(spanText);
        fieldParagraph.appendChild(fieldSpan);
        paragraphText = document.createTextNode(" " + value);
        fieldParagraph.appendChild(paragraphText);  
        recordDiv.appendChild(fieldParagraph);
      }
    }

    // Create new Map (like associative array) that
    // has the fields in the correct order and with better
    // descriptors
    new Map([
      ['First Name', record.firstName],
       ['Last Name', record.lastName],
       ['Email', record.email],
    ]).forEach(loopFields);

    // Set the id and href of delete and edit links
    recordEdit.setAttribute("id", "editRecord" + record.id);
    recordEdit.setAttribute("href", buildURLString("accountEdit.html"));
    recordDelete.setAttribute("id", "deleteRecord" + record.id);
    recordDelete.setAttribute("href", "#");
   

    // Append edit and delete links to div
    recordDiv.appendChild(recordEdit);
    recordDiv.appendChild(recordDelete);

    // append it to the info div
      recordContainer = document.querySelector("#watch-list");
      recordContainer.appendChild(recordDiv);

  });
}

function deleteTVListRecords(recordID) {

  var numRecords;

  let completeDeletion = () => {
    alert("You have deleted your account");
    location.href = 'login.html';
  };

  let deleteRspHandler = (obj) => {
    numRecords -= 1;
    if(numRecords === 0) {
      completeDeletion();
    }
  };

  let queryRspHandler = (obj) => {
    numRecords = obj.records.length;
    if(numRecords) {
      obj.records.forEach(record => {
        let deleteTransactor = new DBDeleteTransaction(deleteRspHandler);
        // Delete tvlist record
        deleteTransactor.sendRequest('tvlist', record.id);
      });
    } else {
      completeDeletion();
    }
  };

  // Query for user account / profile
  let emailAddress;
  let queryTransactor = new DBQueryTransaction(queryRspHandler);
  if((emailAddress = getSignedInKey())) {
    queryTransactor.sendRequest('tvlist', {
      "query": `accountId == "${recordID}"`
    });
  }
}

function deleteRecord(recordID) {
  let deleteRspHandler = (obj) => {
    deleteTVListRecords(recordID);
    removeSignInState();
  };

  let deleteTransactor = new DBDeleteTransaction(deleteRspHandler);
  // Delete user account
  deleteTransactor.sendRequest('useraccount', recordID);
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
    document.querySelector("#deleteRecord" + record.id).addEventListener("click", function(e) {
      e.preventDefault();
      if (!confirmDelete() ) {     
        return false;
      }  deleteRecord(record.id);
    });

  });
}

queryRspHandler = (obj) => {
  // put the array of records from the useraccount table
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

    // return all record from useraccount
    queryTransactor.sendRequest('useraccount', {
      "query": `id == "${id.toString()}"`
      
    });
    
  } 

};

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

    // Personalize header
    updateHeaderUsername($('div.header-center h1'), "'s Account");

    // Query for user account
    var emailAddress;
    var queryAccountTransactor = new DBQueryTransaction(queryAccountRspHandler);
    if((emailAddress = getSignedInKey())) {
      queryAccountTransactor.sendRequest(userAccountTableName, {
        "query": `email == "${emailAddress}"`
      });
    }
  }
  
});
