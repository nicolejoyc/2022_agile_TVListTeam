

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
      console.log(inputFname.value + "\n" + inputLname.value + "\n" +
      inputEmail.value + "\n" + inputPassword.value);

}


