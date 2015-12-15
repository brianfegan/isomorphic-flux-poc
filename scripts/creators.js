import request from 'superagent';
import constants from './constants';
import {getStore} from './store';

let products_req = null;

function getNormalizedProp(prop) {
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

    if ( products_req === null && ( (state.products.categoryId !== categoryId) || (state.products.sort !== sort) ) ){
        store.dispatch({type:constants.LOAD_PRODUCTS, categoryId:categoryId, sort:sort});
    }
}