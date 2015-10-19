const ACCOUNT_REQUEST = 'pgpst/account/ACCOUNT_REQUEST';
const ACCOUNT_SUCCESS = 'pgpst/account/ACCOUNT_SUCCESS';
const ACCOUNT_FAILURE = 'pgpst/account/ACCOUNT_FAILURE';

const ADDRESSES_REQUEST = 'pgpst/account/ADDRESSES_REQUEST';
const ADDRESSES_SUCCESS = 'pgpst/account/ADDRESSES_SUCCESS';
const ADDRESSES_FAILURE = 'pgpst/account/ADDRESSES_FAILURE';

const LABELS_REQUEST = 'pgpst/account/LABELS_REQUEST';
const LABELS_SUCCESS = 'pgpst/account/LABELS_SUCCESS';
const LABELS_FAILURE = 'pgpst/account/LABELS_FAILURE';

const initialState = {
	loading: false,
	account: null,
	addresses: false,
	labels: false
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
		case ADDRESSES_REQUEST:
			return {
				...state,
				addressesLoading: true
			};
		case ADDRESSES_SUCCESS:
			return {
				...state,
				addresses: action.result,
				addressesLoading: false
			};
		case ADDRESSES_FAILURE:
			return {
				...state,
				addresses: null,
				addressesError: action.error
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

export function fetchAddresses() {
	return {
		types: [ADDRESSES_REQUEST, ADDRESSES_SUCCESS, ADDRESSES_FAILURE],
		promise: (client) => client.get('/accounts/me/addresses')
	};
}