import {getStore} from './store';

var actionsCt = 0;
var actionsReadyCt = 0;
var allActionsReady = function(){};

var actionReady = function() {
	actionsReadyCt++;
	if (actionsReadyCt === actionsCt) {
		allActionsReady();
	}
};

// Loop through and dispatch all actions passed in required to render on server
export function loadStoreData(callbackFn, actions) {
	let store = getStore();
	allActionsReady = callbackFn;
	actions.forEach((action) => {
		actionsCt++;
		var newActionObj = Object.assign(action, {store:store, serverCbFn:actionReady});
		store.dispatch(newActionObj);
	});
}