import request from 'superagent';
import {constants} from './constants';
import {getStore} from './store';

let products_req = null;

export function getNormalizedProp(prop) {
    if (typeof prop === 'undefined') {
        prop = '';
    }
    return prop;
}

export function loadProducts(categoryId, sort) {
    categoryId = getNormalizedProp(categoryId);
    sort = getNormalizedProp(sort);

    let store = getStore();
    let state = store.getState().toJS();

    console.log('categoryId='+categoryId);
    console.log('sort='+sort);
    console.log(state);

    if ( products_req === null && ( (state.products.items.length === 0) || (state.products.activeCategoryId !== categoryId) || (state.products.activeSortStr !== sort) ) ){
        store.dispatch({type:constants.LOAD_PRODUCTS, store:store, categoryId:categoryId, sort:sort});
    }
}