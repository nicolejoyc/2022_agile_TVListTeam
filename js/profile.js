$(function() {

  // User account record id
  var id;

  /**
   * Profile Form Submit Handler
   */
  $('#profile-submit').click((e) => {

    let updateRspHandler = (rsp) => {
      if(JSON.stringify(rsp) !== '{}') {
        alert("Something went wrong updating your profile!");
        console.log(rsp);
      } else {
        alert("Profile successfully updated!");
      }
    };

    // Update Error Handler
    let updateErrHandler = (err) => {
      alert("An error occurred storing your information!");
    };

    // Fetch user input
    var nickname = $('#nickname').val();
    var favorite = $("#movie").val();
    var checkboxes = $('input[name="genre"]:checked');
    let genreVals = [];
    checkboxes.each(function() {
      genreVals.push(this.getAttribute('value'));
    });

    // Update user profile
    var updateTransactor = new DBUpdateTransaction(updateRspHandler, updateErrHandler);
    updateTransactor.sendRequest(userAccountTableName, {
      "id": id.toString(),
      "nickname": nickname,
      "movie": favorite,
      "genres": genreVals.toString()
    });
  });

   /**
    * User Account Record Query Response Handler
    */
  let queryRspHandler = (rsp) => {

    // Update user form
    if(rsp.records.length === 1) {

      // Save the record id
      id = rsp.records[0].id;

      // Update name information
      $('#fname').val(rsp.records[0].firstName);
      $('#lname').val(rsp.records[0].lastName);
      $('#nickname').val(rsp.records[0].nickname);

      // Update favorite movie
      $('#movie').val(rsp.records[0].movie);

      // Update genre checkboxes
      $('input[name="genre"]').each(function(index) {
        if(rsp.records[0].genres.includes(this.getAttribute('value'))) {
          this.setAttribute('checked', true);
        }
      });
    }
    // Duplicate account, shouldn't happen
    else if(rsp.records.length > 1) {
      alert("Sorry, an error occurred, multiple profile matches.");
      console.log("Profile query: " + rsp.records.length + " profile matches");
      rsp.records.forEach(record => {
        console.log(record);
      });
    }
    else {
      alert("Sorry, your profile was not found.");
    }
  };

  // Query Error Handler
  let queryErrHandler = (err) => {
    alert("An error occurred retrieving your information!");
  };

  // Query for user account / profile
  let emailAddress;
  let queryTransactor = new DBQueryTransaction(queryRspHandler, queryErrHandler);
  if((emailAddress = getSignedInKey())) {
    queryTransactor.sendRequest(userAccountTableName, {
      "query": `email == "${emailAddress}"`
    });
  }
});