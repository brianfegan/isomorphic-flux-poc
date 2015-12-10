// Require Libraries
var React = require('react');
var Fluxxor = require('fluxxor');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var createHistory = require('history/lib/createBrowserHistory');
var history = createHistory();

// Require App Modules
import {actions} from './actions';
import {ProductsStore,CategoriesStore} from './stores';
import {Products} from './products';
import {hydrate} from './isomorphic';

// set up flux instance and prepopulate stores based on server rendered data
var flux = new Fluxxor.Flux({ProductsStore: new ProductsStore(), CategoriesStore: new CategoriesStore()}, actions);
flux.hydrate = hydrate;
flux.hydrate(window.fluxData);

var App = React.createClass({
	render: function() {
		return (<Products flux={flux} params={this.props.params} query={this.props.location.query} />);
	}
});

React.render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="products(/:categoryId)" component={Products} />
		</Route>
	</Router>
), document.getElementById("body"));