let creatorsCt = 0;
let creatorsReadyCt = 0;
let allCreatorsReady = function(){};

function creatorReady () {
	creatorsReadyCt++;
	if (creatorsReadyCt === creatorsCt) {
		allCreatorsReady();
	}
}

// Loop through and dispatch all actions passed in required to render on server
export function loadStoresData(creators, callbackFn ) {
	allCreatorsReady = callbackFn;
	creators.forEach((creator) => {
		creatorsCt++;
		if (typeof creator.data === 'object' && creator.data.length) {
			creator.fn(...creator.data, creatorReady);
		} else {
			creator.fn(creatorReady);
		}
	});
}

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