import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signIn } from 'state/modules/auth';
import openpgp from 'openpgp';
import './SignIn.css';

@connect((state) => ({
	auth: state.auth
}), (dispatch) => ({
	signIn: (u, p, e) => dispatch(signIn(u, p, e))
}))
export default class SignIn extends React.Component {
	handleSubmit(e) {
		e.preventDefault();

		const password = this.refs.password.value;
		const hashed = openpgp.util.hexidump(openpgp.crypto.hash.sha256(password));

		this.props.signIn(
			this.refs.address.value,
			hashed,
			this.refs.remember.checked ? 60 * 60 * 24 * 14 : 0,
		);
	}

	render() {
		const {user, loginError} = this.props;
		return(
			<div className="SignIn container">
				<form onSubmit={::this.handleSubmit}>
					<div className="form-group">
						<input type="text" ref="address" className="form-control" placeholder="Your address" required autofocus/>
					</div>

					<div className="form-group">
						<input type="password" ref="password" className="form-control" placeholder="Password" required/>
					</div>

					<div className="checkbox">
						<label>
							<input ref="remember" type="checkbox" value="remember-me"/> Remember me
						</label>
					</div>

					{
						this.props.auth.signinError && 
						<div className="alert alert-danger">              
							{'[' + this.props.auth.signinError.code + '] ' + this.props.auth.signinError.message}
							{
								this.props.auth.signinError.errors && this.props.auth.signinError.errors.length > 0 &&
								<ul>
									{this.props.auth.signinError.errors.map((object, i) => {
										return <li key={i}>{object}</li>;	
									})}
								</ul>
							}
						</div>
					}
 
					<button className="btn btn-primary btn-block"><i className="fa fa-sign-in"/>{' '}Log in</button>
				</form>
			</div> 
		);
	}
}
