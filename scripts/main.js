import {createStore} from 'redux';
import {constants} from './constants';
import reducer from './reducer';

const store = createStore(reducer);

store.dispatch({type:constants.SET_CATEGORIES});
console.log(store.getState().toJS());

let items = [{"name":"Bedtime Math","price":10.79,"image":"bedtime.jpg","id":17,"categories":[2]},{"name":"Cowpoke Clyde and Dirty Dawg","price":13.05,"image":"cowpoke.jpg","id":8,"categories":[1]},{"name":"Daredevil: The Daring Life of Betty Skelton","price":12.23,"image":"daredevil.jpg","id":13,"categories":[1,2]},{"name":"Exclamation Mark","price":14.11,"image":"exclamation.jpg","id":7,"categories":[1]},{"name":"Flora and the Flamingo","price":12.74,"image":"flora.jpg","id":12,"categories":[1]},{"name":"Goodnight, Goodnight Construction Site","price":8.1,"image":"construction.jpg","id":15,"categories":[2]},{"name":"If You Want to See a Whale","price":10.56,"image":"whale.jpg","id":4,"categories":[1]},{"name":"Oh, the Places You'll Go!","price":11.44,"image":"places.jpg","id":16,"categories":[2]},{"name":"Ol' Mama Squirrel","price":12.84,"image":"squirrel.jpg","id":11,"categories":[1]},{"name":"Open This Little Book","price":12.9,"image":"littlebook.jpg","id":10,"categories":[1,2]},{"name":"Ribbit!","price":12.05,"image":"ribbit.jpg","id":5,"categories":[1]},{"name":"Steam Train, Dream Train","price":9.93,"image":"steam.jpg","id":2,"categories":[1,2]},{"name":"That Is Not a Good Idea!","price":12.15,"image":"notagoodidea.jpg","id":3,"categories":[1]},{"name":"The Day the Crayons Quit","price":10.37,"image":"crayons.jpg","id":1,"categories":[1]},{"name":"The Going-To-Bed Book","price":5.39,"image":"goingtobed.jpg","id":18,"categories":[2]},{"name":"The Matchbox Diary","price":12.92,"image":"matchbox.jpg","id":9,"categories":[1]},{"name":"The Story of Fish and Snail","price":9.93,"image":"fishandsnail.jpg","id":6,"categories":[1]},{"name":"The Very Hungry Caterpillar","price":16.78,"image":"caterpillar.jpg","id":14,"categories":[1]}];
store.dispatch({type:constants.SET_PRODUCTS, items:items, categoryId:'', sortStr:'?sort=price'});
console.log(store.getState().toJS());

let state = store.getState().toJS();

// Require Libraries
import React from 'react';
import ReactDOM from 'react-dom';
//import Fluxxor from 'fluxxor';
//import {Router,Route} from 'react-router';
//import createHistory from 'history/lib/createBrowserHistory';
//var history = createHistory();

// Require App Modules
//import {actions} from './actions';
//import {ProductsStore,CategoriesStore} from './stores';
import {Products} from './products';
//import {hydrate} from './isomorphic';

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

ReactDOM.render(<Products categories={state.categories} products={state.products.items} categoryId={state.products.activeCategoryId} sortStr={state.products.sortStr} />, document.getElementById("body"));