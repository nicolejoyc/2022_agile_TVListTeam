/**
 * M3O Database Cloud Service Transaction
 */
class M3oDatabaseTransaction extends M3oCloudTransaction {
  constructor(caller, rspHandler, errHandler) {
    super(caller, rspHandler, errHandler);
  }
}

/**
 * Database Count Transaction
 */
class DBCountTransaction extends M3oDatabaseTransaction {
  sendRequest(table) {
    super.sendRequest("https://api.m3o.com/v1/db/Count", {
      'table': table
    });
  }
}

/**
 * Database Create Transaction
 *
 * Example of function argument 'record':
 * {
 *  'id': "100",
 *  'user': 1234,
 *  'first': 'John',
 *  'last': 'Smith',
 *  'age': 35,
 *  'member': true }
 * 
 * Note: Field 'id' is optional.
 * 
 */
class DBCreateTransaction extends M3oDatabaseTransaction {
  sendRequest(table, record) {
    super.sendRequest("https://api.m3o.com/v1/db/Create", {
      'record': record,
      'table': table
    });
  }
}

/**
 * Database Delete Transaction
 */
class DBDeleteTransaction extends M3oDatabaseTransaction {
  sendRequest(table, id) {
    super.sendRequest("https://api.m3o.com/v1/db/Delete", {
      'id': id,
      'table': table
    });
  }
}
  
/**
 * Database Drop Table Transaction
 */
class DBDropTableTransaction extends M3oDatabaseTransaction {
  sendRequest(table) {
    super.sendRequest("https://api.m3o.com/v1/db/DropTable", {
      'table': table
    });
  }
}

/**
 * Database List Tables Transaction
 */
class DBListTablesTransaction extends M3oDatabaseTransaction {
  sendRequest() {
    super.sendRequest("https://api.m3o.com/v1/db/ListTables", {});
  }
}
  
/**
 * Database Read Transaction
 */
class DBReadTransaction extends M3oDatabaseTransaction {
  sendRequest(table, id) {
    super.sendRequest("https://api.m3o.com/v1/db/Read", {
      'id': id,
      'table': table
    });
  }
}

/**
 * Database Query Transaction
 *
 * Query is made up of the following:
 * query    => field name + conditional + value (e.g. Title == 'Title Name')
 * order    => 'asc', 'desc' (default 'asc')
 * orderBy  => field name to order by (e.g "Title")
 * limit    => max records to return (default 25)
 * 
 * Note: order, orderBy and limit are optional.
 * 
 * Example: { "query": "user == 1 && age == 35" }
 */
class DBQueryTransaction extends M3oDatabaseTransaction {
  sendRequest(table, query) {
    // Create query copy & add table name
    var rqData = JSON.parse(JSON.stringify(query));
    rqData.table = table;

    super.sendRequest("https://api.m3o.com/v1/db/Read", rqData);
  }
}

/**
 * Database Truncate Table Transaction
 */
class DBTruncateTransaction extends M3oDatabaseTransaction {
  sendRequest(table) {
    super.sendRequest("https://api.m3o.com/v1/db/Truncate", {
      'table': table
    });
  }
}

/**
 * Database Update Transaction
 */
class DBUpdateTransaction extends M3oDatabaseTransaction {
  sendRequest(table, record) {
    super.sendRequest("https://api.m3o.com/v1/db/Update", {
      'record': record,
      'table': table
    });
  }
}
