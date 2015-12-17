import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Fluxxor from 'fluxxor';
import {Products} from '../scripts/products';
import {makeFlux} from '../scripts/flux';
import {loadStoresData} from '../scripts/isomorphic';
import {actions} from '../scripts/actions';
import {ProductsStore,CategoriesStore} from '../scripts/stores';
import {loadCategories,loadProducts} from '../scripts/creators';

const router = express.Router();

router.get('/:categoryId?', function(req, res, next) {
	var categoryId = req.params.categoryId;
	if (typeof categoryId === 'undefined') categoryId = '';
	var sort = req.query.sort;
	if ( (sort !== 'priceasc') && (sort !== 'pricedesc') ) sort = '';

	// Call serverFetch action to prepopulate data stores
	const creators = [{fn:loadCategories}, {fn:loadProducts, data:[categoryId, sort]}];
	const flux = makeFlux({ProductsStore: new ProductsStore(), CategoriesStore: new CategoriesStore()}, actions);
	loadStoresData(creators, function(){
		let initialState = flux.serialize();
		let markup = ReactDOMServer.renderToString(
			<Products flux={flux} />
		);
		res.render('home', {
			markup: markup,
			initialState: initialState,
			title: 'Express App'
		});
	});
});

module.exports = router;