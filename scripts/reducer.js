//import request from 'superagent';
import {Map, List} from 'immutable';
import {constants} from './constants';

export default function reducer(state = constants.INITIAL_STATE, action) {
    switch (action.type) {
        case constants.SET_CATEGORIES:
            let categories = [{"id":1,"name":"Best Picture Books"},{"id":2,"name":"Books (Ages 3-5)"}];
            return state.set('categories', List(categories));
        case constants.SET_PRODUCTS:
            return state.set('products', Map({items:action.items, activeCategoryId:action.categoryId, activeSortStr:action.sortStr}));
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