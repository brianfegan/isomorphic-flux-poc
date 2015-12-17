import Fluxxor from 'fluxxor';
import constants from './constants';

export var CategoriesStore = Fluxxor.createStore({
  initialize: function() {
	this.state = {};
    this.bindActions(
		constants.LOAD_CATEGORIES, this.onLoadCategories,
		constants.LOAD_CATEGORIES_SUCCESS, this.onLoadCategoriesSuccess
    );
  },

  onLoadCategories: function() {
	  this.state.categories = [];
	  this.state.loading = true;
	  this.emit("change");
  },

  onLoadCategoriesSuccess: function(data) {
	this.state.categories = data.categories;
	this.state.loading = false;
	this.emit("change");
  },
    
  getState: function() {
	  return this.state;
  },
  
  setState: function(data) {
      this.state = data;
  }
});

export var ProductsStore = Fluxxor.createStore({
  initialize: function() {
	this.state = {};
	this.bindActions(
	  constants.LOAD_PRODUCTS, this.onLoadProducts,
	  constants.LOAD_PRODUCTS_SUCCESS, this.onLoadProductsSuccess
    );
  },
    
  onLoadProducts: function(data) {
	this.state.items = [];
	this.state.categoryId = data.categoryId;
	this.state.sort = data.sort;
	this.emit("change");
  },

  onLoadProductsSuccess: function(data) {
	this.state.items = data.products;
    this.emit("change");
  },
    
  getState: function() {
	  return this.state;
  },
  
  setState: function(data) {
      this.state = data;
  }

});