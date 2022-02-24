/**
 * M3O Cloud Service Transaction
 * 
 * Base class for other "specific" cloud service classes. This class
 * supports sending a cloud service request. The object instantiation
 * requires response and error handling functions. The error handler
 * can be passed as null resulting in default console logging.
 * 
 */

class M3oCloudTransaction {

  // Initialize cloud transaction
  constructor(rspHandler, errHandler) {
    // Handlers
    this.rspHandler = rspHandler;
    this.errHandler = errHandler;
    // Debug
    this.debug = false;
  }

  // Send cloud service transaction
  sendRequest(url, rqData) {

    // Debug mode
    if(this.debug) {
      console.log(url);
      console.log(rqData);
    }

    // Send request, receive & extract response, call handler
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + m3oKey,
      },
      body: JSON.stringify(rqData)
    }).then(function(response) {
      return response.json();
    }).then($.proxy(function(obj) {
      if(this.rspHandler) {
        this.rspHandler(obj);
      } else {
        console.log(obj);
      }
    }, this)).catch($.proxy(function(error) {
      if(this.errHandler) {
        this.errHandler(error);
      }
      console.error(error);
    }, this));
  }
}