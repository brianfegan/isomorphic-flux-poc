var React = require('react');
var Fluxxor = require('fluxxor');
var Link = require('react-router').Link;

var FluxMixin = Fluxxor.FluxMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Products = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ProductsStore", "CategoriesStore")],
  
  getProducts: function(props) {
	return this.getFlux().store("ProductsStore").getProducts(this.getNormalizedProp(props.params.categoryId), this.getNormalizedProp(props.query.sort));
  },

  getStateFromFlux: function() {
    return {
    	products: this.getProducts(this.props),
    	categories: this.getFlux().store("CategoriesStore").getCategories()
    }
  },

  /*componentDidMount: function() {
	  this.loadProducts(this.props);
	  this.setState({categories: this.getFlux().store("CategoriesStore").getCategories(), products:this.getProducts(this.props)});
  },*/
  
  componentWillReceiveProps: function(nextProps) {
	  this.setState({products:this.getProducts(nextProps)});
  },
  
  getNormalizedProp: function(prop) {
	  if (typeof prop === 'undefined') {
		  prop = '';
	  }
	  return prop;
  },
  
  getSortObj: function(sortStr) {
	  var sortObj = {str: '', query: {}};
	  	if (sortStr !== '') {
	  		sortObj.str = sortStr;
			sortObj.search = '?sort='+sortStr;
			sortObj.query = {sort:sortStr};		
		}
	  return sortObj;
  },
  
  render: function() {
	var sortObj = this.getSortObj(this.getNormalizedProp(this.props.query.sort));
	var activeCategoryId = this.getNormalizedProp(this.props.params.categoryId);
	return (
    	<div id="wrapper">
			<header>
				<div><h1>&#60;codetest&#62;</h1></div>
				<FiltersList categories={this.state.categories} activeCategoryId={activeCategoryId} sortObj={sortObj} />
			</header>
			<div id="main">
				<section id="content">
					<ProductsList products={this.state.products} />	
				</section>
				<aside>
					<SortList activeCategoryId={activeCategoryId} sortObj={sortObj} />
				</aside>
			</div>
			<footer>
				<span>&copy; Lorem ipsum dolor sit amet.</span>
			</footer>
		</div>
    );
  }
});

var SortList = React.createClass({
	render: function() {
		var activeCategoryId = this.props.activeCategoryId;
		var sortObj = this.props.sortObj;
		var href = '/products/';
		var sortClasses = { alpha:'', priceasc:'', pricedesc:'' };
		if (activeCategoryId !== '') {
			href = href + activeCategoryId;
		}
		switch (sortObj.str) {
			case 'priceasc':
				sortClasses.priceasc = 'selected';
				break;
			case 'pricedesc':
				sortClasses.pricedesc = 'selected';
				break;
			default:
				sortClasses.alpha = 'selected';
		}
		return (
			<div>
				Sort by:
				<Link to={href} href={href} className={sortClasses.alpha}>Alphabetically</Link>
				<Link to={href} query={{sort:'priceasc'}} href={href+'?sort=priceasc'} className={sortClasses.priceasc}>Price: Low to High</Link>
				<Link to={href} query={{sort:'pricedesc'}} href={href+'?sort=pricedesc'} className={sortClasses.pricedesc}>Price: High to Low</Link>
			</div>
		);
	}
});
  
var FilterItem = React.createClass({
	render: function() {
		var category = this.props.category,
			sortObj = this.props.sortObj,
			href = '/products/'+category.id;
		return (
			<Link to={href} query={sortObj.query} href={href+sortObj.search} className={this.props.className}>{category.name}</Link>
		);
	}
});

var FiltersList = React.createClass({
	mixins: [FluxMixin],
	render: function() {
		var items = [],
			sortObj = this.props.sortObj,
			href = '/products',
			activeCategoryId = this.props.activeCategoryId,
			allClassName = (activeCategoryId === '') ? 'selected' : '';
		this.props.categories.forEach(function(category){
			var className = (parseInt(activeCategoryId, 10) === category.id) ? 'selected' : '';
			items.push(<FilterItem category={category} className={className} key={category.id} sortObj={sortObj} />);
		});
		return (
			<nav>				
				<Link to={href} query={sortObj.query} href={href+sortObj.search} className={allClassName}>All Products</Link>
				{items}
			</nav>
		);
	}
});

var ProductItem = React.createClass({
	render: function() {
		var image = '/img/'+this.props.product.image,
			price = 'Price.......$'+this.props.product.price;
		return (
			<li>
				<a href="#">
					<img src={image} alt="" />
					<h3>{ this.props.product.name }</h3>
					<span>{price}</span>
				</a>
			</li>
		);
	}
});

var ProductsList = React.createClass({
	render: function() {
		var items = [];
		this.props.products.forEach(function(product){
			items.push(<ProductItem product={product} key={product.id} />);
		});
		return (
			<ul className="products clearfix">
				{items}
			</ul>
		);
	}
});
		
module.exports = Products;