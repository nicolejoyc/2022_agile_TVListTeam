function validateForm() {
  let x3 = document.forms.accountDeletion.email.value;
    if (x3 === "") {
      alert("Please enter your email address");
    return false;
  }
  let x4 = document.forms.accountDeletion.pwd.value;
    if (x4 === "") {
      alert("Please enter your password");
    return false;
  }
  return true;
}

queryRspHandler = (obj) => {
  record = obj.records[0];
};
var queryTransactor = new DBQueryTransaction(queryRspHandler);
queryTransactor.sendRequest('useraccount', {});


function deleteRecord(record) {
  deleteRspHandler = (obj) => {
    record = obj.records;
  };

  var deleteTransactor = new DBDeleteTransaction(deleteRspHandler);
  deleteTransactor.sendRequest('useraccount', record);
}
document.querySelector("#accountDeletion").addEventListener("submit", function(e) {
  e.preventDefault();
  if (!validateForm()) {     
    return false;
  }
  deleteRecord(record.id);
  alert("You have deleted your account");
  if (!validateForm()) {     
    return false;
  }
  removeSignInState();
  location.href = 'login.html';
});


