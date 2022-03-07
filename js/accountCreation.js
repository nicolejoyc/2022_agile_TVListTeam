
// Form validation for users

function validateForm() {
    let x = document.forms.accountCreation.fname.value;
    if (x === "") {
        alert("Please enter your first name");
      return false;
    }
    let x1 = document.forms.accountCreation.lname.value;
      if (x1 === "") {
        alert("Please enter your last name");
      return false;
    }
    let x3 = document.forms.accountCreation.email.value;
      if (x3 === "") {
        alert("Please enter your email address");
      return false;
    }
    let x4 = document.forms.accountCreation.pwd.value;
      if (x4 === "") {
        alert("Please enter a password");
      return false;
    }
    let x5 = document.forms.accountCreation.pwd2.value;
      if (x5 !== x4) {
        alert("Your passwords do not match");
      return false;
    }
    return true;
}


// Event listener for the form submit
document.querySelector("#accountCreation").addEventListener("submit", function(e){
  e.preventDefault();
  if (!validateForm()) {     
    return false;
  }
    
  var inputFname = document.querySelector("#fname");
  var inputLname = document.querySelector("#lname");
  var inputEmail = document.querySelector("#email");
  var inputPassword = document.querySelector("#pwd");
  
  console.log(inputFname.value + "\n" + inputLname.value + "\n" +
               inputEmail.value + "\n" + inputPassword.value);

  var newRecordId = 1;

  // Response handler 
  listTablesRspHandler = (obj) => {
  var  tables = obj.tables;

    function tblExists(table) {
      return table === userAccountTableName;
    }

    if (tables.find(tblExists) === userAccountTableName) {
      // table exists, so find highest id in table and add one

      queryRspHandler = (obj) => {
       var records = obj.records;   
      
        // updated2/28/2022
        if (records.length) {
          newRecordId = Number(records[0].id) + 1;
         } 
         // knowing table exists check to see if email address exists
         records.forEach(record => {
          if (record.email === inputEmail.value) {
            document.getElementById("accountCreation").reset();
            throw new Error(alert("The email address is already being used. Please login or enter a different email"));
          } 
        });

        // Calls the sendRequest method from createTransactor instance of the
        // DBCreateTransaction Class
        var createTransactor = new DBCreateTransaction();
        createTransactor.sendRequest(userAccountTableName, {         
          "id": newRecordId.toString(), 
          "firstName": inputFname.value,
          "lastName": inputLname.value,
          "email": inputEmail.value,
          "password": inputPassword.value,
          "nickname": "",
          "movie": "",
          "genres": ""

        });
        // test firefox
        validateForm();
        // confirmation of sucessful account creation and re direct to login.
        alert("thank you for signing up, please login");
        location.href = 'login.html';

      };

      var queryTransactor = new DBQueryTransaction(queryRspHandler);

      // sends a request to query the useraccount data to only return the
      // record with the highest id (id desc)
      queryTransactor.sendRequest(userAccountTableName, {
        table: userAccountTableName,
        limit: 99,
        orderBy: "id",
        order: "desc" 
      });

    } else {
      // table does not exist, so set first record to id of 1
      newRecordId = 1;
    }
  };
  var listTablesTransactor = new DBListTablesTransaction(listTablesRspHandler);

  listTablesTransactor.sendRequest();
  });