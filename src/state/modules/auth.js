import ls from 'local-storage';
import { config } from 'config';

const SIGNIN_REQUEST = 'pgpst/auth/SIGNIN_REQUEST';
const SIGNIN_SUCCESS = 'pgpst/auth/SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'pgpst/auth/SIGNIN_FAILURE';

const SIGNOUT_REQUEST = 'pgpst/auth/SIGNOUT_REQUEST';
const SIGNOUT_SUCCESS = 'pgpst/auth/SIGNOUT_SUCCESS';
const SIGNOUT_FAILURE = 'pgpst/auth/SIGNOUT_FAILURE';

const initialState = {
	loading: false,
	token: ls('token')
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case SIGNIN_REQUEST:
			return {
				...state,
				loading: true
			};
		case SIGNIN_SUCCESS:
			ls('token', action.result);

			return {
				...state,
				token: action.result,
				loading: false
			};
		case SIGNIN_FAILURE:
			ls.remove('token');

			return {
				...state,
				loading: false,
				token: null,
				signinError: action.error
			};
		case SIGNOUT_SUCCESS:
			ls.remove('token');

			return {
				...state,
				token: null
			};
		case SIGNOUT_FAILURE:
			ls.remove('token');

			return {
				...state,
				token: null,
				signoutError: action.error
			};
		default:
			return state;
	}
}

export function signIn(address, password, expiry_time) {
	return {
		types: [SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE],
		promise: (client) => client.post('/oauth', {
			data: {
				grant_type: 'password',
				address: address,
				password: password,
				client_id: config.CLIENT_ID,
				expiry_time: expiry_time
			}
		})
	};
}

export function signOut(token) {
	return {
		types: [SIGNOUT_REQUEST, SIGNOUT_SUCCESS, SIGNOUT_FAILURE],
		promise: (client) => client.del('/token/' + token)
	}
}
