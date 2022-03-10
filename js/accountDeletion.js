// form validation
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

function confirmDelete() {
  let text = "Are you sure you want to Delete your account?";
  if (confirm(text) === true) {
   return true;
  } 
  return false;
}

queryRspHandler = (obj) => {
  record = obj.records[0];
};
var queryTransactor = new DBQueryTransaction(queryRspHandler);
queryTransactor.sendRequest('useraccount', {});
queryTransactor.sendRequest('tvlist', {});

// Deletes user from useraccount and tvlist account
function deleteRecord(record) {
  deleteRspHandler = (obj) => {
    record = obj.records;
  };

  var deleteTransactor = new DBDeleteTransaction(deleteRspHandler);
  deleteTransactor.sendRequest('useraccount', record);

  deleteTransactor = new DBDeleteTransaction(deleteRspHandler);
  deleteTransactor.sendRequest('tvlist', record);
}
document.querySelector("#accountDeletion").addEventListener("submit", function(e) {
  e.preventDefault();
  if (!validateForm() || !confirmDelete() ) {     
    return false;
  }
  
  deleteRecord(record.id);
  alert("You have deleted your account");
  // added for speedy browsers
  if (!validateForm()) {     
    return false;
  }
  removeSignInState();
  location.href = 'login.html';
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


