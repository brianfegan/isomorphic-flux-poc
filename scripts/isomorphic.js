var creatorsCt = 0;
var creatorsReadyCt = 0;
var allCreatorsReady = function(){};

var creatorReady = function() {
	creatorsReadyCt++;
	if (creatorsReadyCt === creatorsCt) {
		allCreatorsReady();
	}
};

// Loop through and dispatch all actions passed in required to render on server
export function loadStoreData(creators, callbackFn ) {
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