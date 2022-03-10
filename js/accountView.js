
function displayRecord(recordList) {
  recordList.forEach(record => {
      
    var recordDiv = document.createElement("div");

    //create format for displaying user info
    function loopFields(value, key) {       
      if (value !== "") { 
        fieldParagraph = document.createElement("p");
        fieldSpan = document.createElement("span");
        spanText = document.createTextNode(key + ":");
        fieldSpan.appendChild(spanText);
        fieldParagraph.appendChild(fieldSpan);
        paragraphText = document.createTextNode(" " + value);
        fieldParagraph.appendChild(paragraphText);
        recordDiv.appendChild(fieldParagraph);
      }  
    }
    //display user information
    new Map([
      ['My Email', record.email],
      ['First Name', record.firstName],
      ['Last Name', record.lastName],
      ]).forEach(loopFields);

      recordContainer = document.querySelector("#info");
      recordContainer = document.querySelector("#info");
      recordContainer.appendChild(recordDiv); 
    });

    // create edit and delete buttons assigned action links
    var editBtn = document.getElementById("btn1");     
      editBtn.onclick = function(){
      location.href="accountEdit.html";
    };  
        
    var deleteBtn = document.getElementById("btn2");   
      deleteBtn.onclick = function(){
      location.href="accountDeletion.html";
    };  
  }

  queryRspHandler = (obj) => {
    records = obj.records;
    displayRecord(records);
  };

  // User Account Record Query Response Handler
  var queryAccountRspHandler = (obj) => {
  if(obj.records.length === 1) {
    email = obj.records[0].email;

  var queryTransactor = new DBQueryTransaction(queryRspHandler);
    // return records from useraccount
    queryTransactor.sendRequest('useraccount', {
      "query": `email == "${email.toString()}"`
    });
    } else {
      
  }
};