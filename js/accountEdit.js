
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
  let x3 = document.forms.accountEdit.email.value;
    if (x3 === "") {
      alert("Please enter your email address");
    return false;
  }
  let x4 = document.forms.accountEdit.pwd.value;
    if (x4 === "") {
      alert("Please enter a password");
    return false;
  }
  let x5 = document.forms.accountEdit.pwd2.value;
    if (x5 !== x4) {
      alert("Your passwords do not match");
    return false;
  }
  return true;
}


var inputFirstName = document.querySelector("#fname");
var inputLastName = document.querySelector("#lname");
var inputNickName = document.querySelector("#nname");
var inputEmail = document.querySelector("#email");
var inputPassword = document.querySelector("#pwd");
var inputConfirm = document.querySelector("#pwd2");

function loadRecord(record) {
  inputEmail.value = record.email;
  inputFirstName.value = record.firstName;
  inputLastName.value = record.lastName;
  inputNickName.value = record.nickname;
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
      nickname: inputNickName.value,
      email: inputEmail.value,
      password: inputPassword.value,      
    });
  }
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