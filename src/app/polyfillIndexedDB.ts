// @ts-nocheck
if (typeof window === "undefined") {

  global.IDBRequest = class IDBRequest {
    constructor() {}

    public addEventListener() {}

    public error() {}
    public onerror() {}
    public onsuccess() {}
    public readyState() {}
    public result() {}
    public source() {}
    public transaction() {}
    public removeEventListener() {}
    public dispatchEvent() {}
  };

  global.indexedDB = {
    open: () => new global.IDBRequest(),
  };

  global.IDBTransaction = class IDBTransaction {
    constructor() {}
  };

  global.IDBDatabase = class IDBDatabase {
    constructor() {}
  };

  global.IDBObjectStore = class IDBObjectStore {
    constructor() {}
  };

  global.IDBIndex = class IDBIndex {
    constructor() {}
  };

  global.IDBCursor = class IDBCursor {
    constructor() {}
  };
}