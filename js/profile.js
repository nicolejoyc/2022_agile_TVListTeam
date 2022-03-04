$(function() {

  // User account record id
  var id;

  /**
   * Profile Form Submit Handler
   */
  $('#profile-submit').click((e) => {

    let updateRspHandler = (rsp) => {
      if(JSON.stringify(rsp) !== '{}') {
        alert("Ah oh, something went wrong updating profile!");
        console.log(rsp);
      } else {
        alert("Profile successfully updated!");
      }
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
    var updateTransactor = new DBUpdateTransaction(updateRspHandler);
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
        console.log("index: " + index + " " + this.getAttribute('value'));
        if(rsp.records[0].genres.includes(this.getAttribute('value'))) {
          this.setAttribute('checked', true);
        }
      });
    }
  };

  // Query for user account / profile
  let emailAddress;
  let queryTransactor = new DBQueryTransaction(queryRspHandler);
  if((emailAddress = getSignedInKey())) {
    queryTransactor.sendRequest(userAccountTableName, {
      "query": `email == "${emailAddress}"`
    });
  }
});