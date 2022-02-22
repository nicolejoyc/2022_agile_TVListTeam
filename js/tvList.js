$(function() {
  // Global key needed for M3O cloud service access
  m3oKey = "-- M3O Key --";

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

      // Database delete response handler
      deleteRspHandler = (obj) => {
        console.log(JSON.stringify(obj));
        // Delete done, chain complete
      };
      // Database delete transaction
      let deleteTransactor = new DBDeleteTransaction(null, deleteRspHandler);

      // Database read response handler
      readRspHandler = (obj) => {
        console.log(JSON.stringify(obj));
        // Send database delete request
        deleteTransactor.sendRequest('test', id);
      };
      // Database read transaction
      let readTransactor   = new DBReadTransaction(null, readRspHandler);

      // Database create response handler
      createRspHandler = (obj) => {
        console.log(JSON.stringify(obj));
        // Send database read request
        readTransactor.sendRequest('test', id);
      };
      // Database create transaction
      let createTransactor = new DBCreateTransaction(null, createRspHandler);

      // Send database create request (create table if doesn't exist)
      createTransactor.sendRequest('test', { 'id': id, 'name': 'John', 'age': 35, 'member': true });
 */
  
});
