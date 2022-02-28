

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
      alert("thank you for signing up, please login");
      console.log(fname.value + "\n" + lname.value + "\n" +
      email.value + "\n" + pwd.value);

}

// m3oKey = "";


var userAccountTableName = "useraccount";

// Event listener for the form submit
document.querySelector("#accountCreation").addEventListener("submit", function(e){
  e.preventDefault(); 

  var inputFname = document.querySelector("#fname");
  var inputLname = document.querySelector("#lname");
  var inputEmail = document.querySelector("#email");
  var inputPassword = document.querySelector("#pwd");
  var inputFavorite = document.querySelector("#movie");
  var checkboxes = document.querySelectorAll('input[name="genre"]:checked');
  let genreVals = [];
    checkboxes.forEach((checkbox) => {
     genreVals.push(checkbox.value);
    });


  console.log(inputFname.value + "\n" + inputLname.value + "\n" +
               inputEmail.value + "\n" + inputPassword.value + "\n" + inputFavorite.value + "\n" + genreVals);

  var newRecordId = "";

  // Response handler to manipulate the returned info
  listTablesRspHandler = (obj) => {
  var  tables = obj.tables;

    function tblExists(table) {
      return table === userAccountTableName;
    }

    if (tables.find(tblExists) === userAccountTableName) {
      // table exists, so find highest id in table and add one

      queryRspHandler = (obj) => {
       var records = obj.records;

        // sets the newRecordId to one plus the id of the current
        // record with the highest id
        // this way, even if a record between the lowest and highest
        // id is deleted, the next stored id will still be accurate
        newRecordId = (records.length) ? Number(records[0].id) + 1 : 1;


        // Calls the sendRequest method from createTransactor instance of the
        // DBCreateTransaction Class
        var createTransactor = new DBCreateTransaction();
        createTransactor.sendRequest(userAccountTableName, {         
          "id": newRecordId.toString(), 
          "firstName": inputFname.value,
          "lastName": inputLname.value,
          "email": inputEmail.value,
          "password": inputPassword.value, 
          "movie": inputFavorite.value,
          "genres": genreVals.toString()
          

        });


      }

      var queryTransactor = new DBQueryTransaction(queryRspHandler);

      // sends a request to query the tvList data to only return the
      // record with the highest id (id desc)
      queryTransactor.sendRequest(userAccountTableName, {
        table: userAccountTableName,
        limit: 1,
        orderBy: "id",
        order: "desc"
      });

    } else {
      // table does not exist, so set first record to id of 1
      newRecordId = "1";
    };
  };

  var listTablesTransactor = new DBListTablesTransaction(listTablesRspHandler);

  listTablesTransactor.sendRequest();
 
});
