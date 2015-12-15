//require('babel-core/register');
//import React from 'react';
//import ReactDOMServer from 'react-dom/server';
import {createStore} from 'redux';
//import {Provider} from 'react-redux';

import reducer from '../scripts/reducer';
//var Products = React.createFactory(require("../scripts/products").Products);
//import Products from '../scripts/products';
//Products = React.createFactory(Products);

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
	//res.render('home', {
	//	markup: '',
	//	fluxData: '',
	//	title: 'Express App'
	//});
	//var HtmlElement = React.createElement(Products, {
	//	flux: flux,
	//	params: {categoryId:categoryId},
	//	query: {sort:sort}
	//});
	// create a data store and retrieve data
	var state;
	const actions = [{type:'LOAD_CATEGORIES'},{type:'LOAD_PRODUCTS', categoryId:categoryId, sort:sort}];
	const store = createStore(reducer);
	store.dispatch({type:'LOAD_SERVER', store:store, actions:actions, serverCbFn:function(){
		console.log('server data ready!');
		state = store.getState().toJS();
		//console.log(state);
		console.log(encodeURI(JSON.stringify(state)));
		res.render('home', {
			markup: '',
			stateData: encodeURI(JSON.stringify(state)),
			title: 'Express App'
		});
	}});
});

module.exports = router;