//require('babel-core/register');
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from '../scripts/reducer';
import Products from '../scripts/products';

var express = require('express');
var router = express.Router();

router.get('/:categoryId?', function(req, res, next) {
	var categoryId = req.params.categoryId;
	if (typeof categoryId === 'undefined') {
		categoryId = '';
	}
	var sort = req.query.sort;
	if ( (sort !== 'priceasc') && (sort !== 'pricedesc') ) {
		sort = '';
	}
	// create a data store, retrieve data, render markup
	var state;
	const actions = [{type:'LOAD_CATEGORIES'},{type:'LOAD_PRODUCTS', categoryId:categoryId, sort:sort}];
	const store = createStore(reducer);
	store.dispatch({type:'LOAD_SERVER', store:store, actions:actions, serverCbFn:function(){
		state = store.getState().toJS();
		let markup = ReactDOMServer.renderToString(
			<Provider store={store}>
				<Products />
			</Provider>
		);
		res.render('home', {
			markup: markup,
			stateData: encodeURI(JSON.stringify(state)),
			title: 'Express App'
		});
	}});
});

module.exports = router;