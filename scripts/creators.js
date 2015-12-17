import request from 'superagent';
import constants from './constants';
import {getFlux} from './flux';

let products_req = null;

function getNormalizedProp(prop) {
    if (typeof prop === 'undefined') prop = '';
    return prop;
}

export function loadCategories(cbFn) {
    let flux = getFlux();
    flux.actions.loadCategories();
    request.get(constants.API_URL_DEV+'categories').end( (err, resp) => {
        flux.actions.loadCategoriesSuccess(resp.body);
        if (typeof cbFn === 'function') cbFn();
    });
}

export function loadProducts(categoryId, sort, cbFn) {
    categoryId = getNormalizedProp(categoryId);
    sort = getNormalizedProp(sort);
    let flux = getFlux();
    let state = flux.store("ProductsStore").getState();
    if ((!state.items) || ( (state.categoryId !== categoryId) || (state.sort !== sort) ) ) {
        if (products_req !== null) products_req.abort();
        flux.actions.loadProducts(categoryId, sort);
        let url = constants.API_URL_DEV + 'products/' + categoryId;
        if (sort !== '') url = url + '?sort=' + sort;
        products_req = request.get(url).end( (err, resp) => {
            flux.actions.loadProductsSuccess(resp.body, categoryId, sort);
            products_req = null;
            if (typeof cbFn === 'function') cbFn();
        });
    }
}