import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createMiddleware from 'state/middlewares/clientMiddleware';

import account from 'state/modules/account';
import auth from 'state/modules/auth';

export default function configureStore(client) {
	const middleware = createMiddleware(client);
	const logger = createLogger();
	const reducer = combineReducers({
		account,
		auth,
	});

	const createWithMiddleware = applyMiddleware(
		middleware,
		thunkMiddleware,
		logger,
	)(createStore);

	return createWithMiddleware(reducer);
}
