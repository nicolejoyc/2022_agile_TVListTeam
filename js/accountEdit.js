function validateForm() {
  let x = document.forms.accountEdit.fname.value;
  if (x === "") {
      alert("Please enter your first name");
    return false;
  }
  let x1 = document.forms.accountEdit.lname.value;
    if (x1 === "") {
      alert("Please enter your last name");
    return false;
  }
  let x2 = document.forms.accountEdit.pwd.value;
    if (x2 === "") {
      alert("Please enter a password");
    return false;
  }
  let x3 = document.forms.accountEdit.pwd2.value;
    if (x3 !== x2) {
      alert("Your passwords do not match");
    return false;
  }
  return true;
}


// initialize and assign variables of the html elements for use in functions
var inputFirstName = document.querySelector("#fname");
var inputLastName = document.querySelector("#lname");
var inputPassword = document.querySelector("#pwd");

function loadRecord(record) {

  // set html elements to hold record info
  inputFirstName.value = record.firstName;
  inputLastName.value = record.lastName;
  inputPassword.value = record.password;
}


function editRecord(record) {


  function updateAccount() {
    
    updateRspHandler = (obj) => {
      location.assign(buildURLString("accountView.html"));
    };
  
    var updateTransactor = new DBUpdateTransaction(updateRspHandler);

    updateTransactor.sendRequest('useraccount', {
      id: record.id,
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      password: inputPassword.value,
    });
    
  }


  // listen for the form submit
  document.querySelector("#accountEdit").addEventListener("submit", function(e) {
    e.preventDefault();
    if (!validateForm()) {     
      return false;
    }
    updateAccount();
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
  readTransactor.sendRequest('useraccount', editID);

});
$(function() {
  // Instantiate the header drop-down menu
  var dropDownMenu = new DropDownMenu($('#dd-menu'));
  // Update drop-down title to user email address
  $('#dd-menu span').get(0).innerHTML = getSignedInKey();

  // Collapse drop-down menu on document click
  $(document).click(function() {
    $('.wrapper-dropdown').removeClass('active');
  });
});


