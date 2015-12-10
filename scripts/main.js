// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Fluxxor from 'fluxxor';
import {Router,Route} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
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

ReactDOM.render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="products(/:categoryId)" component={Products} />
		</Route>
	</Router>
), document.getElementById("body"));