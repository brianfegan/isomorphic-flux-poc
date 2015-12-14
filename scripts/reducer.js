import request from 'superagent';
import {Map, List} from 'immutable';
import {constants} from './constants';

export default function reducer(state = constants.INITIAL_STATE, action) {
    console.log(action.type);
    console.log(action);
    switch (action.type) {
        case constants.LOAD_CATEGORIES:
            request.get(constants.API_URL_DEV+'categories').end( (err, resp) => {
                action.store.dispatch({type:constants.LOAD_CATEGORIES_SUCCESS, categories:resp.body});
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
                action.store.dispatch({type:constants.LOAD_PRODUCTS_SUCCESS, items:resp.body, categoryId:action.categoryId, sort:action.sort});
                if (typeof action.serverCbFn === 'function') {
                    serverCbFn();
                }
            });
            if (state.get('products')){
                return state;
            } else {
                return state.set('products', Map({
                    items: [],
                    activeCategoryId: '',
                    activeSortStr: ''
                }));
            }
        case constants.LOAD_CATEGORIES_SUCCESS:
            return state.set('categories', List(action.categories));
        case constants.LOAD_PRODUCTS_SUCCESS:
            return state.set('products', Map({items:action.items, activeCategoryId:action.categoryId, activeSortStr:action.sort}));
    };
    return state;
}

/*
import {constants} from './constants';
import {loadStoresData} from './isomorphic';

export var actions = {
    loadCategoriesSuccess: function(data) {
        this.dispatch(constants.LOAD_CATEGORIES_SUCCESS, {categories:data});
    },
    loadProductsSuccess: function(data, categoryId, sort) {
        this.dispatch(constants.LOAD_PRODUCTS_SUCCESS, {products:data, categoryId:categoryId, sort:sort});
    },
    serverFetch: loadStoresData
};
*/