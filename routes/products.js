//require('babel-core/register');
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../scripts/reducer';
import Products from '../scripts/products';
import {makeStore} from '../scripts/store';

var express = require('express');
var router = express.Router();

router.get('/:categoryId?', function(req, res, next) {
	var categoryId = req.params.categoryId;
	if (typeof categoryId === 'undefined') categoryId = '';
	var sort = req.query.sort;
	if ( (sort !== 'priceasc') && (sort !== 'pricedesc') ) sort = '';

	// create a data store, retrieve data, render markup
	const actions = [{type:'LOAD_CATEGORIES'},{type:'LOAD_PRODUCTS', categoryId:categoryId, sort:sort}];
	const store = makeStore();
	store.dispatch({type:'LOAD_SERVER', actions:actions, serverCbFn:function(){
		let initialState = store.getState().toJS();
		let markup = ReactDOMServer.renderToString(
			<Provider store={store}>
				<Products />
			</Provider>
		);
		res.render('home', {
			markup: markup,
			initialState: encodeURI(JSON.stringify(initialState)),
			title: 'Express App'
		});
	}});
});

module.exports = router;