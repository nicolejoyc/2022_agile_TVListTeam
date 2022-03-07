
queryRspHandler = (obj) => {
  record = obj.records[0];
};
var queryTransactor = new DBQueryTransaction(queryRspHandler);

// return all records from useraccount
queryTransactor.sendRequest('useraccount', {});


function deleteRecord(record) {
  deleteRspHandler = (obj) => {
    record = obj.records;
  };

  var deleteTransactor = new DBDeleteTransaction(deleteRspHandler);

  deleteTransactor.sendRequest('useraccount', record);


}
  // add an event listener for the onlick of the delete link
  // id of delete link will be (#"deleteRecord" + record.id)
document.querySelector("#accountDeletion").addEventListener("click", function() {
  deleteRecord(record.id);

});


