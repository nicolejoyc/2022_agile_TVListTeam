/**
 * M3O Key Class
 *
 */
class M3oKey {

  // M3O Key Constructor
  constructor() {
    this.m3oKey = undefined;
    this.isSession = undefined;
    this.initKey();
  }

  // Initialize key state from storage
  initKey() {
    // Probe session storage for M3O key
    if((this.m3oKey = sessionStorage.getItem(this.storageKey()))) {
      this.isSession = true;
    }
    // Probe local storage for M3O key
    else if((this.m3oKey = localStorage.getItem(this.storageKey()))) {
      this.isSession = false;
    }
    // Not in storage, undefined
    else {
      this.isSession = undefined;
    }
  }

  // M3O Key associated storage key (string)
  storageKey() {
    return "m3oKey";
  }

  // Get key
  getKey() {
    return this.m3oKey;
  }
  // Get storage type
  isSessionKey() {
    return this.isSession  === true;
  }
  isLocalKey() {
      return this.isSession !== true;
  }
  isKeyUndefined() {
    return this.isSession === undefined;
  }

  // Store M3O key
  setSessionKey(key) {
    if(key) {
      sessionStorage.setItem(this.storageKey(), key);
      this.isSession = true;
      this.m3oKey = key;
      return key;
    }
    return null;
  }
  setLocalKey(key) {
    if(key) {
      localStorage.setItem(this.storageKey(), key);
      this.isSession = false;
      this.m3oKey = key;
      return key;
    }
    return null;
  }

  // Remove key from storage
  removeKeyStorage() {
    sessionStorage.removeItem(this.storageKey());
    localStorage.removeItem(this.storageKey());
    this.isSession = undefined;
  }

  // Reset key
  resetKey() {
    this.removeKeyStorage();
    this.m3oKey = undefined;
  }
}

m3oKeyObj = new M3oKey();
