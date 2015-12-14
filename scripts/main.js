// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
//import Fluxxor from 'fluxxor';
//import {Router,Route} from 'react-router';
//import createHistory from 'history/lib/createBrowserHistory';
//var history = createHistory();

// Require App Modules
import {constants} from './constants';
import reducer from './reducer';
import Products from './products';
//import {hydrate} from './isomorphic';

// create our initial store state
const store = createStore(reducer);

// temp code to populate redux state
store.dispatch({type:constants.LOAD_CATEGORIES, store:store});
store.dispatch({type:constants.LOAD_PRODUCTS, store:store, categoryId:'', sort:''});

ReactDOM.render(
    <Provider store={store}>
        <Products />
    </Provider>,
    document.getElementById("body")
);

// set up flux instance and prepopulate stores based on server rendered data
//var flux = new Fluxxor.Flux({ProductsStore: new ProductsStore(), CategoriesStore: new CategoriesStore()}, actions);
//flux.hydrate = hydrate;
//flux.hydrate(window.fluxData);

//var App = React.createClass({
//	render: function() {
//		return (<Products params={this.props.params} query={this.props.location.query} />);
//		//return (<Products flux={flux} params={this.props.params} query={this.props.location.query} />);
//	}
//});

//ReactDOM.render((
//	<Router history={history}>
//		<Route path="/" component={App}>
//			<Route path="products(/:categoryId)" component={Products} />
//		</Route>
//	</Router>
//), document.getElementById("body"));