import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute} from 'react-router';

import API from 'api';
import configureStore from 'state';

import Home from './containers/home/Home';
import UsersPage from './containers/user/UsersPage';
import ReposPage from './containers/repo/ReposPage';
import About from './containers/about/About';

import App from './containers/App';
import NotFound from './containers/NotFound/NotFound';

import Public from './containers/Public/Public';
import Index from './containers/Public/Index/Index';
import SignIn from './containers/Public/SignIn/SignIn';

import Client from './containers/Client/Client';
import Emails from './containers/Client/Emails/Emails';

const client = new API();
const store = configureStore(client);
client.bindToStore(store);

const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route component={App}>
				<Route component={Public}>
					<Route path="/" component={Index} />
					<Route path="/signin" component={SignIn} />
				</Route>

				<Route component={Client}>
					<Route path="/emails" component={Emails} />
					<Route path="/emails/:label" component={Emails} />
					<Route path="/emails/:label/:thread" component={Emails} />
					<Route path="/users" component={UsersPage} />
					<Route path="/repos" component={ReposPage} />
				</Route>

				<Route path="*" component={NotFound}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
