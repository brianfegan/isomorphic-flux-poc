var actionsCt = 0;
var actionsReadyCt = 0;
var allActionsReady = function(){};

var actionReady = function() {
	actionsReadyCt++;
	if (actionsReadyCt === actionsCt) {
		allActionsReady();
	}
};

// Add an action that can be used to populate store state data on the server
export function loadStoreData(store, callbackFn, actions) {
	allActionsReady = callbackFn;
	actions.forEach((action) => {
		actionsCt++;
		var newActionObj = Object.assign(action, {store:store, serverCbFn:actionReady});
		store.dispatch(newActionObj);
	});
	//var stores = this.flux.stores, key;
	//for (key in stores) {
	//	if (stores.hasOwnProperty(key) && (typeof stores[key].loadStoreData === 'function')) {
	//		storesCt++;
	//		stores[key].loadStoreData(storeReady, data);
	//	}
	//}
};

//Add our own custom serialize and hydrate methods.
//export function serialize() {
//    var data = {}, stores = this.stores;
//    for (var key in stores) {
//    	if (stores.hasOwnProperty(key) && (typeof stores[key].getState === 'function')) {
//    		data[key] = stores[key].getState();
//    	}
//    }
//    return encodeURI(JSON.stringify(data));
//};

export function hydrate(data) {
	var stores = this.stores;
	data = JSON.parse(decodeURI(data));
	for (var key in data) {
		if (stores.hasOwnProperty(key) && (typeof stores[key].setState === 'function')) {
	        stores[key].setState(data[key]);
		}
    }
};