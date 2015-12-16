import request from 'superagent';
import {Map, List} from 'immutable';
import constants from './constants';
import {getStore} from './store';

export default function reducer(state = Map(), action) {
    console.log(action);
    let store = getStore();
    switch (action.type) {
        case constants.LOAD_CATEGORIES:
            request.get(constants.API_URL_DEV+'categories').end( (err, resp) => {
                store.dispatch({type:constants.LOAD_CATEGORIES_SUCCESS, categories:resp.body});
                if (typeof action.serverCbFn === 'function') {
                    action.serverCbFn();
                }
            });
            return state.set('categories', []);
        case constants.LOAD_PRODUCTS:
            var url = constants.API_URL_DEV + 'products/' + action.categoryId;
            if (action.sort !== '') {
                url = url + '?sort=' + action.sort;
            }
            request.get(url).end( (err, resp) => {
                store.dispatch({type:constants.LOAD_PRODUCTS_SUCCESS, items:resp.body, categoryId:action.categoryId, sort:action.sort});
                if (typeof action.serverCbFn === 'function') {
                    action.serverCbFn();
                }
            });
            if (state.get('products')){
                return state;
            } else {
                return state.set('products', Map({
                    items: [],
                    categoryId: '',
                    sort: ''
                }));
            }
        case constants.LOAD_CATEGORIES_SUCCESS:
            return state.set('categories', List(action.categories));
        case constants.LOAD_PRODUCTS_SUCCESS:
            return state.set('products', Map({items:action.items, categoryId:action.categoryId, sort:action.sort}));
    };
    return state;
}