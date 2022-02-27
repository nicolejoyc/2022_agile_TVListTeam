

// Form validation for users

function validateForm() {
    let x = document.forms["accountCreation"]["fname"].value;
    if (x == "") {
      alert("Please enter your first name");
      return false;
    }
    let x1 = document.forms["accountCreation"]["lname"].value;
    if (x1 == "") {
      alert("Please enter your last name");
      return false;
    }
    let x3 = document.forms["accountCreation"]["email"].value;
    if (x3 == "") {
      alert("Please enter your email address");
      return false;
    }
    let x4 = document.forms["accountCreation"]["pwd"].value;
    if (x4 == "") {
      alert("Please enter a password");
      return false;
    }
      let x5 = document.forms["accountCreation"]["pwd2"].value;
      if (x5 != x4) {
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
  //  var inputgenre1 = document.querySelector('#genre1');
  // var inputgenre2 = document.querySelector('#genre2');
  // var inputgenre3 = document.querySelector('#genre3');
  // var inputgenre4 = document.querySelector('#genre4');
  // var inputgenre5 = document.querySelector('#genre5');
  // var inputgenre6 = document.querySelector('#genre6');
  // var inputgenre7 = document.querySelector('#genre7');
  // var inputgenre8 = document.querySelector('#genre8');
  // var inputgenre9 = document.querySelector('#genre9');
  // var inputgenre10 = document.querySelector('#genre10');
  // var inputgenre11 = document.querySelector('#genre11');
  // var inputgenre12 = document.querySelector('#genre12');
  // var inputgenre13 = document.querySelector('#genre13');
  // var inputgenre14 = document.querySelector('#genre14');
  // var inputgenre15 = document.querySelector('#genre15');
  // var inputgenre16 = document.querySelector('#genre16');
  // var inputgenre17 = document.querySelector('#genre17');
  // var inputgenre18 = document.querySelector('#genre18');


  console.log(inputFname.value + "\n" + inputLname.value + "\n" +
               inputEmail.value + "\n" + inputPassword.value + "\n" + inputFavorite.value);

  var newRecordId = "";

  // Response handler to manipulate the returned info
  listTablesRspHandler = (obj) => {
    tables = obj['tables'];

    function tblExists(table) {
      return table === userAccountTableName;
    }

    if (tables.find(tblExists) === userAccountTableName) {
      // table exists, so find highest id in table and add one

      queryRspHandler = (obj) => {
        records = obj['records'];

        // sets the newRecordId to one plus the id of the current
        // record with the highest id
        // this way, even if a record between the lowest and highest
        // id is deleted, the next stored id will still be accurate
        newRecordId = Number(records[0].id) + 1;


        // Calls the sendRequest method from createTransactor instance of the
        // DBCreateTransaction Class
        var createTransactor = new DBCreateTransaction();
        createTransactor.sendRequest(userAccountTableName, {         
          "id": newRecordId.toString(), 
          "firstName": inputFname.value,
          "lastName": inputLname.value,
          "email": inputEmail.value,
          "password": inputPassword.value, 
          "movie": inputFavorite.value
          
          // "genre1": inputgenre1.value
          // "genre2": inputgenre2.value,
          // "genre3": inputgenre3.value,
          // "genre4": inputgenre4.value,
          // "genre5": inputgenre5.value,
          // "genre6": inputgenre6.value,
          // "genre7": inputgenre7.value,
          // "genre8": inputgenre8.value,
          // "genre9": inputgenre9.value,
          // "genre10": inputgenre10.value,
          // "genre11": inputgenre11.value,
          // "genre12": inputgenre12.value,
          // "genre13": inputgenre13.value,
          // "genre14": inputgenre14.value,
          // "genre15": inputgenre15.value,
          // "genre16": inputgenre16.value,
          // "genre17": inputgenre17.value,
          // "genre18": inputgenre18.value


        })


      };

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
