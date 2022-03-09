
function displayRecord(recordList) {

    recordList.forEach(record => {
      
      var recordDiv = document.createElement("div");
  
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
      new Map([
        ['My Account Id', record.id],
        ['My Email', record.email],
        ['First Name', record.firstName],
        ['Last Name', record.lastName],
        ['Nickname', record.nickname],
      ]).forEach(loopFields);

        recordContainer = document.querySelector("#info");
        recordContainer = document.querySelector("#info");
        recordContainer.appendChild(recordDiv); 
    });

    var editBtn = document.getElementById("btn1");  
    
    editBtn.onclick = function(){
      location.href="accountedit.html";
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
  var queryTransactor = new DBQueryTransaction(queryRspHandler);
  
  queryTransactor.sendRequest(userAccountTableName, {
    table: userAccountTableName
 
});