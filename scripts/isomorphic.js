var storesCt = 0;
var storesReadyCt = 0;
var allStoresReady = function(){};

var storeReady = function() { 
	storesReadyCt++; 
	if (storesReadyCt === storesCt) {
		allStoresReady();
	}
};

// Add an action that can be used to populate store state data on the server
export function loadStoresData(callbackFn, data) {
	allStoresReady = callbackFn;
	var stores = this.flux.stores, key;
	for (key in stores) {
		if (stores.hasOwnProperty(key)) {
			if (typeof stores[key].loadStoreData === 'function') {
				storesCt++;
				stores[key].loadStoreData(storeReady, data);  
			}
		}
	}
};

//Add our own custom serialize and hydrate methods.
export function serialize() {
    var data = {}, stores = this.stores;
    for (var key in stores) {
    	if (stores.hasOwnProperty(key) && (typeof stores[key].getState === 'function')) {
    		data[key] = stores[key].getState();
    	}
    }
    return encodeURI(JSON.stringify(data));
};

export function hydrate(data) {
	var stores = this.stores;
	data = JSON.parse(decodeURI(data));
	for (var key in data) {
		if (stores.hasOwnProperty(key) && (typeof stores[key].setState === 'function')) {
	        stores[key].setState(data[key]);
		}
    }
};