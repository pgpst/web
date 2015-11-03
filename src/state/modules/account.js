const ACCOUNT_REQUEST = 'pgpst/account/ACCOUNT_REQUEST';
const ACCOUNT_SUCCESS = 'pgpst/account/ACCOUNT_SUCCESS';
const ACCOUNT_FAILURE = 'pgpst/account/ACCOUNT_FAILURE';

const KEYS_REQUEST = 'pgpst/account/KEYS_REQUEST';
const KEYS_SUCCESS = 'pgpst/account/KEYS_SUCCESS';
const KEYS_FAILURE = 'pgpst/account/KEYS_FAILURE';

const LABELS_REQUEST = 'pgpst/account/LABELS_REQUEST';
const LABELS_SUCCESS = 'pgpst/account/LABELS_SUCCESS';
const LABELS_FAILURE = 'pgpst/account/LABELS_FAILURE';

const initialState = {
	loading: false,
	account: null,
	addresses: false,
	labels: false,
	keys: false,
}

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case ACCOUNT_REQUEST:
			return {
				...state,
				accountLoading: true
			};
		case ACCOUNT_SUCCESS:
			return {
				...state,
				account: action.result,
				accountLoading: false
			};
		case ACCOUNT_FAILURE:
			return {
				...state,
				account: null,
				accountError: action.error
			};
		case KEYS_REQUEST:
			return {
				...state,
				keysLoading: true
			};
		case KEYS_SUCCESS:
			return {
				...state,
				keys: action.result,
				keysLoading: false
			};
		case KEYS_FAILURE:
			return {
				...state,
				keys: null,
				keysError: action.error
			};
		case LABELS_REQUEST:
			return {
				...state,
				labelsLoading: true
			};
		case LABELS_SUCCESS:
			return {
				...state,
				labels: action.result,
				labelsLoading: false
			};
		case LABELS_FAILURE:
			return {
				...state,
				labels: null,
				labelsError: action.error
			};
		default:
			return state;
	}
}

export function fetchAccount() {
	return {
		types: [ACCOUNT_REQUEST, ACCOUNT_SUCCESS, ACCOUNT_FAILURE],
		promise: (client) => client.get('/accounts/me')
	};
}

export function fetchLabels() {
	return {
		types: [LABELS_REQUEST, LABELS_SUCCESS, LABELS_FAILURE],
		promise: (client) => new Promise((resolve, reject) => {
			client.get('/accounts/me/labels').then((body) => {
				const result = {
					system: [],
					lookup: {},
					custom: [],
					all: body
				};

				body.forEach((label) => {
					if (label.system) {
						result.system.push(label);
					} else {
						result.custom.push(label);
					}

					result.lookup[label.name] = label;
				});

				resolve(result);
			}, (error) => {
				reject(error);
			});
		})
	};
}

export function fetchKeys() {
	return {
		types: [KEYS_REQUEST, KEYS_SUCCESS, KEYS_FAILURE],
		promise: (client) => new Promise((resolve, reject) => {
			Promise.all([
				client.get('/accounts/me/resources?tags=keychain'),
				client.get('/accounts/me/keys'),
				// load keys from cache
			]).then(([resource, server_keys, cache]) => {
				const result = {};

				server_keys.forEach((key) => {

				});
				// map

				resolve(result);
			}, (error) => {
				reject(error);
			});
		})
	};
}