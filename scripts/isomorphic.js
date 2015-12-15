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
}

export function decode(data) {
    return JSON.parse(decodeURI(data));
}