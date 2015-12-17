import constants from './constants';

export var actions = {
  loadCategories: function() {
    this.dispatch(constants.LOAD_CATEGORIES);
  },
  loadProducts: function(categoryId, sort) {
    this.dispatch(constants.LOAD_PRODUCTS, {categoryId:categoryId, sort:sort});
  },
  loadCategoriesSuccess: function(data) {
	this.dispatch(constants.LOAD_CATEGORIES_SUCCESS, {categories:data});
  },
  loadProductsSuccess: function(data) {
	this.dispatch(constants.LOAD_PRODUCTS_SUCCESS, {products:data});
  }
};