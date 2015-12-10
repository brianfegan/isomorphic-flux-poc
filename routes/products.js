require('babel-core/register');
var React = require("react");
var Fluxxor = require('fluxxor');
var actions = require('../scripts/actions').actions;
var ProductsStore = require('../scripts/stores').ProductsStore;
var CategoriesStore = require('../scripts/stores').CategoriesStore;
var Products = React.createFactory(require("../scripts/products").Products);

var express = require('express');
var router = express.Router();

var flux = new Fluxxor.Flux({
	ProductsStore: new ProductsStore(),
	CategoriesStore: new CategoriesStore()
}, actions);

flux.serialize = require('../scripts/isomorphic').serialize;

// GET products page.
router.get('/:categoryId?', function(req, res, next) {
	var categoryId = req.params.categoryId;
	if (typeof categoryId === 'undefined') {
		categoryId = '';
	}
	var sort = req.query.sort;
	if ( (sort !== 'priceasc') && (sort !== 'pricedesc') ) {
		sort = '';
	}
	var HtmlElement = React.createElement(Products, {
		flux: flux,
		params: {categoryId:categoryId},
		query: {sort:sort}
	});
	// Call serverFetch action to prepopulate data stores
	flux.actions.serverFetch(function(){
		var fluxData = flux.serialize();
		var markup = React.renderToString(HtmlElement);
		res.render('home', {
			markup: markup,
			fluxData: fluxData,
			title: 'Express App'
		});
	}, {categoryId:categoryId, sort:sort});
});

module.exports = router;