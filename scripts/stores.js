import Fluxxor from 'fluxxor';
import request from 'superagent';
import {constants} from './constants';

export var CategoriesStore = Fluxxor.createStore({
  initialize: function() {
    this.state = {
    	categories: []
    };
    this.req = null;
    this.bindActions(
      constants.LOAD_CATEGORIES_SUCCESS, this.onLoadCategoriesSuccess
    );
  },
    
  onLoadCategoriesSuccess: function(data) {
	this.state.categories = data.categories;
	this.emit("change");
  },
    
  loadStoreData: function(serverCbFn) {
	  this.req = request.get(constants.API_URL_DEV+'categories').end( (err, resp) => {
		  this.flux.actions.loadCategoriesSuccess(resp.body);
		  this.req = null;
		  if (typeof serverCbFn === 'function') {
			  serverCbFn();
		  }
	  });
  },
  
  getState: function() {
	  return this.state;
  },
  
  setState: function(data) {
      this.state = data;
  },
  
  getCategories: function() {
	  // TODO: think we can get rid of this condition as stores are populated from server
	  if (this.req === null && this.state.categories.length === 0){
		  this.loadStoreData();
	  }
	  return this.state.categories;
  }
  
});

export var ProductsStore = Fluxxor.createStore({
  initialize: function() {
	this.state = {
		products: [],
	    activeCategoryId: '',
	    activeSortStr: ''
	};
	this.req = null;
    this.bindActions(
      constants.LOAD_PRODUCTS_SUCCESS, this.onLoadProductsSuccess
    );
  },
    
  onLoadProductsSuccess: function(data) {
	this.state.products = data.products;
	this.state.activeCategoryId = data.categoryId;
	this.state.activeSortStr = data.sort;
    this.emit("change");
  },
    
  loadStoreData: function(serverCbFn, data) {
	  //console.log('loadStoreData...getProducts');
	  //console.log(data);
	  var url = constants.API_URL_DEV + 'products/' + data.categoryId;
	  if (data.sort !== '') {
		  url = url + '?sort=' + data.sort;
	  }
      this.req = request.get(url).end( (err, resp) => {
		  this.flux.actions.loadProductsSuccess(resp.body, data.categoryId, data.sort);
		  this.req = null;
		  if (typeof serverCbFn === 'function') {
			  serverCbFn();
		  }
	  });
  },
    
  getState: function() {
	  return this.state;
  },
  
  setState: function(data) {
      this.state = data;
  },
  
  getProducts: function(categoryId, sortStr) {
	  /*
	  console.log('getProducts...categoryId='+categoryId+', '+typeof categoryId);
	  console.log('getProducts...activeCategoryId='+this.state.activeCategoryId+', '+typeof this.state.activeCategoryId);
	  console.log( (this.state.activeCategoryId !== categoryId) );
	  console.log('getProducts...sort='+sortStr+', '+typeof sortStr);
	  console.log('getProducts...activeSortStr='+this.state.activeSortStr+', '+typeof this.state.activeSortStr);
	  console.log( (this.state.activeSortStr !== sortStr) );
	  console.log('getProducts...this.state.products.length='+this.state.products.length);
	  */
	  // TODO: think we can get rid of arrayLen check since stores are populated from server
	  if ( this.req === null && ( (this.state.products.length === 0) || (this.state.activeCategoryId !== categoryId) || (this.state.activeSortStr !== sortStr) ) ){
		  this.state.activeCategoryId = categoryId;
		  this.state.activeSortStr = sortStr;
		  this.loadStoreData(null, {categoryId:categoryId, sort:sortStr});
	  }
	  return this.state.products;
  }

});