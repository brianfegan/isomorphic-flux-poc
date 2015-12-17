// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Fluxxor from 'fluxxor';
import {Router,Route} from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';
var history = createHistory();

// Require App Modules
import {makeFlux} from './flux';
import {actions} from './actions';
import {ProductsStore,CategoriesStore} from './stores';
import {Products} from './products';
import {loadProducts} from './creators';

// set up flux instance and prepopulate stores based on server rendered data
var flux = makeFlux({ProductsStore: new ProductsStore(), CategoriesStore: new CategoriesStore()}, actions);
flux.hydrate(window.__INITIAL_STATE__);

var App = React.createClass({
	componentWillReceiveProps: function(props){
		loadProducts(props.params.categoryId, props.location.query.sort);
	},
	render: function() {
		return (<Products flux={flux} />);
	}
});

ReactDOM.render((
	<Router history={history}>
		<Route path="/" component={App}>
			<Route path="products(/:categoryId)" component={Products} />
		</Route>
	</Router>
), document.getElementById("body"));