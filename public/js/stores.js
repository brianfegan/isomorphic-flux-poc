var Fluxxor = require('fluxxor');
var request = require('superagent');
var constants = require('./constants');

exports.CategoriesStore = Fluxxor.createStore({
  initialize: function() {
    this.state = {
    	categories: [] //[{"id":1,"name":"Best Picture Books"},{"id":2,"name":"Books (Ages 3-5)"}]
    };
    this.req = null;
    this.bindActions(
      constants.LOAD_CATEGORIES_SUCCESS, this.onLoadCategoriesSuccess
    );
  },
    
  onLoadCategoriesSuccess: function(payload) {
	this.state.categories = payload.categories;
	this.emit("change");
  },
    
  loadStoreData: function(serverCbFn) {
	  var that = this;
	  this.req = request.get('http://localhost:3000/categories').end(function(err, resp) {
		  that.flux.actions.loadCategoriesSuccess(resp.body);
		  that.req = null;
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
	  console.log('getCategories');
	  var that = this;
	  if (this.req === null && this.state.categories.length === 0){
		  this.loadStoreData();
	  }
	  return this.state.categories;
  }
  
});

exports.ProductsStore = Fluxxor.createStore({
  initialize: function() {
	this.state = {
		products: [], //[{"name":"Bedtime Math","price":10.79,"image":"bedtime.jpg","id":17,"categories":[1]},{"name":"Cowpoke Clyde and Dirty Dawg","price":13.05,"image":"cowpoke.jpg","id":8,"categories":[0]},{"name":"Daredevil: The Daring Life of Betty Skelton","price":12.23,"image":"daredevil.jpg","id":13,"categories":[0,1]},{"name":"Exclamation Mark","price":14.11,"image":"exclamation.jpg","id":7,"categories":[0]},{"name":"Flora and the Flamingo","price":12.74,"image":"flora.jpg","id":12,"categories":[0]},{"name":"Goodnight, Goodnight Construction Site","price":8.1,"image":"construction.jpg","id":15,"categories":[1]},{"name":"If You Want to See a Whale","price":10.56,"image":"whale.jpg","id":4,"categories":[0]},{"name":"Oh, the Places You'll Go!","price":11.44,"image":"places.jpg","id":16,"categories":[1]},{"name":"Ol' Mama Squirrel","price":12.84,"image":"squirrel.jpg","id":11,"categories":[0]},{"name":"Open This Little Book","price":12.9,"image":"littlebook.jpg","id":10,"categories":[0,1]},{"name":"Ribbit!","price":12.05,"image":"ribbit.jpg","id":5,"categories":[0]},{"name":"Steam Train, Dream Train","price":9.93,"image":"steam.jpg","id":2,"categories":[0,1]},{"name":"That Is Not a Good Idea!","price":12.15,"image":"notagoodidea.jpg","id":3,"categories":[0]},{"name":"The Day the Crayons Quit","price":10.37,"image":"crayons.jpg","id":1,"categories":[0]},{"name":"The Going-To-Bed Book","price":5.39,"image":"goingtobed.jpg","id":18,"categories":[1]},{"name":"The Matchbox Diary","price":12.92,"image":"matchbox.jpg","id":9,"categories":[0]},{"name":"The Story of Fish and Snail","price":9.93,"image":"fishandsnail.jpg","id":6,"categories":[0]},{"name":"The Very Hungry Caterpillar","price":16.78,"image":"caterpillar.jpg","id":14,"categories":[1]}],
	    activeCategoryId: null
	};
	this.req = null;
    this.bindActions(
      constants.LOAD_PRODUCTS_SUCCESS, this.onLoadProductsSuccess
    );
  },
    
  onLoadProductsSuccess: function(payload) {
	this.state.products = payload.products;
    this.emit("change");
  },
    
  loadStoreData: function(serverCbFn, data) {
	  //console.log('loadStoreData...getProducts...data...');
	  //console.log(data);
	  var that = this;
	  var url = 'http://localhost:3000/products';
	  if ( (typeof data !== 'undefined') && (typeof data.categoryId === 'number') ) {
    	url = url + '/' + data.categoryId;
      };
      this.req = request.get(url).end(function(err, resp) {
		  that.flux.actions.loadProductsSuccess(resp.body);
		  that.req = null;
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
  
  getProducts: function(categoryId) {
	  console.log('getProducts...catId='+categoryId);
	  if ( this.req === null && ( (this.state.products.length === 0) || (this.state.activeCategoryId !== categoryId) ) ){
		  this.state.activeCategoryId = categoryId;
		  this.loadStoreData(null, {categoryId:categoryId});
	  }
	  //console.log(this.state.products);
	  return this.state.products;
  }

});