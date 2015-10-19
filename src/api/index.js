import superagent from 'superagent';
import { config } from 'config';

export default class API {
	constructor() {
		['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
			this[method] = (path, options) => {
				return new Promise((resolve, reject) => {
					const request = superagent[method](this.formatURL(path));
					
					if (this.token && this.token.id) {
						request.set('Authorization', 'Bearer ' + this.token.id);
					}

					if (options) {
						if (options.params) {
							request.query(options.params);
						}
						if (options.data) {
							request.send(options.data);
						}
					}

					request.end((err, res) => {
						if (err) {
							reject((res && res.body) || err);
						}

						resolve(res.body);
					});
				});
			}
		});
	}

	bindToStore(store) {
		store.subscribe(() => {
			console.log("scope update");

			const state = store.getState();

			if (state && state.auth && state.auth.token) {
				this.token = state.auth.token;
			}
		});

		const state = store.getState();
		if (state && state.auth && state.auth.token) {
			this.token = store.getState().auth.token;
		}
	}

	formatURL(path) {
		const adjustedPath = path[0] !== '/' ? '/' + path : path;
		return config.API_URL + adjustedPath;
	}
}