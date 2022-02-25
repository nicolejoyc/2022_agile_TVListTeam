$(function() {

  // Global key needed for M3O cloud service access
  if(m3oKeyObj.isKeyUndefined()) {
    // Get M3O Key from user
    while(!(m3oKey = window.prompt("Please Enter M3OKey:", ""))) {
      // Continue until key is entered
    }
    // Rember ky on this computer, save key local
    if(window.confirm("Remember key on this computer?")) {
      m3oKeyObj.setLocalKey(m3oKey);
    }
    // Do not remember key, save key for session
    else {
      m3oKeyObj.setSessionKey(m3oKey);
    }
  }

  /**
   * The following is code to demonstrate use of
   * database cloud transactions chained together:
   * 
   *  create record -> read record -> delete record
   * 
   * The result of each transaction is sent to the console
   * from the transaction response handlers.
   * 
   * Reload web page to see execute code.
   * 
   * NOTE: M3O AUTHORIZATION KEY IS REQUIRED ABOVE (m3oKey)
   * 
   * REMOVE CODE WHEN AN IMPLEMENTATION IS COMPLETE
   */

  /*
      // Table record 'id'
      let id = "10";
      let tableName = 'people';

      // Database delete response handler
      deleteRspHandler = (obj) => {
        console.log(JSON.stringify(obj));
        // Delete done, chain complete
      };
      
      // Database query response handler
      queryRspHandler = (obj) => {
        console.log(JSON.stringify(obj));
        // Database delete transaction
        let deleteTransactor = new DBDeleteTransaction(deleteRspHandler);
        // Send database delete request
        deleteTransactor.sendRequest(tableName, id);
      };

      // Database create response handler
      createRspHandler = (obj) => {
        console.log(JSON.stringify(obj));
        // Database query transaction
        let queryTransactor = new DBQueryTransaction(queryRspHandler);
        // Send database query request
        queryTransactor.sendRequest(tableName, { "query": "name == 'John' && age == 35" });
      };
      
      // Database create transaction
      let createTransactor = new DBCreateTransaction(createRspHandler);
      // Send database create request (create table if doesn't exist)
      createTransactor.sendRequest(tableName, { 'id': id, 'name': 'John', 'age': 35, 'member': true });
 */
  
});


