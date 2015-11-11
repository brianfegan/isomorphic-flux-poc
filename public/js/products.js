var React = require('react');
var Fluxxor = require('fluxxor');
var Link = require('react-router').Link;

var FluxMixin = Fluxxor.FluxMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Products = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ProductsStore", "CategoriesStore")],
  
  getCategories: function() {
	return (this.getFlux().store("CategoriesStore").getCategories());
  },
  
  getProducts: function(props) {
	var categoryId = props.params.categoryId;
	if (typeof categoryId !== 'undefined') {
		categoryId = parseInt(categoryId, 10);
	}
	return (this.getFlux().store("ProductsStore").getProducts(categoryId));
  },

  getStateFromFlux: function() {
    return {
    	products: this.getProducts(this.props),
    	categories: this.getCategories()
    }
  },

  /*componentDidMount: function() {
	  console.log('componentDidMount');
	  this.loadProducts(this.props);
	  this.setState({categories: this.getCategories(), products:this.getProducts(this.props)});
  },*/
  
  componentWillReceiveProps: function(nextProps) {
	  //console.log('componentWillReceiveProps');
	  //this.loadProducts(nextProps);
	  this.setState({products:this.getProducts(nextProps)});
  },
  
  render: function() {
	//console.log('RENDER Products...');
	//console.log(this.props);
    return (
    	<div id="wrapper">
			<header>
				<div><h1>&#60;codetest&#62;</h1></div>
				<FiltersList categories={this.state.categories} activeCategoryId={this.props.params.categoryId} />
			</header>
			<div id="main">
				<section id="content">
					<ProductsList products={this.state.products} />	
				</section>
				<aside>
					<div>
						Filter by:
						<a href="#" className="selected">Alphabetically</a>
						<a href="#">Price: Low to High</a>
						<a href="#">Price: High to Low</a>
					</div>
				</aside>
			</div>
			<footer>
				<span>&copy; Lorem ipsum dolor sit amet.</span>
			</footer>
		</div>
    );
  }
});
  
var FilterItem = React.createClass({
	render: function() {
		var category = this.props.category,
			href = '/'+category.id;
		return (
			<Link to={href} href={href} className={this.props.className} data-cat-id={category.id}>{category.name}</Link>
		);
	}
});

var FiltersList = React.createClass({
	mixins: [FluxMixin],
	render: function() {
		var items = [],
			activeCategoryId = this.props.activeCategoryId,
			allClassName = (typeof activeCategoryId === 'undefined') ? 'selected' : '';
		this.props.categories.forEach(function(category){
			var className = (parseInt(activeCategoryId, 10) === category.id) ? 'selected' : '';
			items.push(<FilterItem category={category} className={className} key={category.id} />);
		});
		return (
			<nav>				
				<Link to={'/'} className={allClassName}>All Products</Link>
				{items}
			</nav>
		);
	}
});

var ProductItem = React.createClass({
	render: function() {
		var image = 'img/'+this.props.product.image,
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