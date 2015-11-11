var constants = require('./constants');
var loadStoresData = require('./isomorphic').loadStoresData;

var actions = {
  loadCategoriesSuccess: function(data) {
	this.dispatch(constants.LOAD_CATEGORIES_SUCCESS, {categories: data});
  },
  loadProductsSuccess: function(data) {
	this.dispatch(constants.LOAD_PRODUCTS_SUCCESS, {products: data});
  },
  serverFetch: loadStoresData
};

module.exports = actions;