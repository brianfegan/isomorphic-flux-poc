// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {Map, List} from 'immutable';
//import {Router,Route} from 'react-router';
//import createHistory from 'history/lib/createBrowserHistory';
//var history = createHistory();

// Require App Modules
import {constants} from './constants';
import reducer from './reducer';
import Products from './products';
import {decode} from './isomorphic';

// create store, prepopulate with server data, or load initial data
var store;
if (window.stateData && window.stateData.length) {
    let window_state = decode(window.stateData);
    let initial_state = Map( {categories:List(window_state.categories), products:Map(window_state.products)} );
    store = createStore(reducer, initial_state);
} else {
    store = createStore(reducer);
    store.dispatch({type:constants.LOAD_CATEGORIES, store:store});
    store.dispatch({type:constants.LOAD_PRODUCTS, store:store, categoryId:'', sort:''});
}

ReactDOM.render(
    <Provider store={store}>
        <Products />
    </Provider>,
    document.getElementById("body")
);

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