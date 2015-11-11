// Require Libraries
var React = require('react');
var Fluxxor = require('fluxxor');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
//var createHistory = require('history').createHashHistory;
var createHistory = require('history/lib/createHashHistory');
var history = createHistory();

// Require App Modules
var actions = require('./actions');
var ProductsStore = require('./stores').ProductsStore;
var CategoriesStore = require('./stores').CategoriesStore;
var Products = require('./products');

// set up flux instance and prepopulate stores based on server rendered data
var flux = new Fluxxor.Flux({ProductsStore: new ProductsStore(), CategoriesStore: new CategoriesStore()}, actions);
flux.hydrate = require('./isomorphic').hydrate;
flux.hydrate(window.fluxData);

//flux.on("dispatch", function(type, payload) {
//  if (console && console.log) {
//    console.log("[Dispatch]", type, payload);
//  }
//});

//React.render(<Products flux={flux} />, document.getElementById("body"));

var App = React.createClass({
	render: function() {
		return (<Products flux={flux} params={this.props.params} />);
	}
});

React.render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="/:categoryId" component={App} />
		</Route>
	</Router>
), document.getElementById("body"));