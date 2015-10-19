import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'state/modules/auth';
import { fetchAccount, fetchLabels, fetchAddresses } from 'state/modules/account';
import { Link } from 'react-router';
import { NavLink } from 'components';
import './Client.css';

@connect((state) => ({
	account: state.account,
	token: state.auth.token
}), (dispatch) => ({
	signOut: (token) => dispatch(signOut(token)),
	fetchAccount: () => dispatch(fetchAccount()),
	fetchLabels: () => dispatch(fetchLabels()),
	fetchAddresses: () => dispatch(fetchAddresses())
}))
export default class Client extends React.Component {
	static contextTypes = {
		history: PropTypes.object.isRequired
	};

	static propTypes = {
		token: PropTypes.object,
		params: PropTypes.object,
		children: PropTypes.node.isRequired
	};

	componentWillReceiveProps(nextProps) {
		if (!nextProps.token) {
			this.context.history.replaceState(null, '/');
		}

		if (!nextProps.params.label) {
			if (nextProps.account.labels && nextProps.account.labels.lookup) {
				let inbox = nextProps.account.labels.lookup["Inbox"];
				if (inbox) {
					this.context.history.replaceState(null, '/emails/' + inbox.id);
				}
			}
		}

		console.log(nextProps.account);

		if (!nextProps.account.account && !nextProps.account.accountLoading) {
			// Load account
			nextProps.fetchAccount();
		}

		if (!nextProps.account.labels && !nextProps.account.labelsLoading) {
			// Load labels
			nextProps.fetchLabels();
		}

		if (!nextProps.account.addresses && !nextProps.account.addressesLoading) {
			// Load addresses
			nextProps.fetchAddresses();
		}
	}

	componentWillMount() {
		this.componentWillReceiveProps(this.props);
	}

	handleSignOut() {
		this.props.signOut(this.props.token.id);
	}

	render() {
		return (
			<div className="Client">
				<div className="Client-header navbar-inverse">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>

							<Link className="navbar-brand" to="/emails">pgp.st</Link>
						</div>

						<div className="collapse navbar-collapse" id="navbar">
							<ul className="nav navbar-nav">
								<NavLink to="/emails">Mailbox</NavLink>
								<NavLink to="/storage">Storage</NavLink>
							</ul>

							{/*<form className="navbar-form navbar-left" role="search">
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Search" />
								</div>
								<button type="submit" className="btn btn-default">Submit</button>
							</form>*/}

							<ul className="nav navbar-nav navbar-right">
								<NavLink to="/account">{this.props.account.addresses && this.props.account.addresses[0].id}</NavLink>
								<li><a onClick={::this.handleSignOut}>Sign out</a></li>
							</ul>
						</div>
					</div>
				</div>

				{
					(this.props.account.accountLoading ||
					this.props.account.labelsLoading ||
					this.props.account.addressesLoading) &&
						<div className="Client-loading">
							Loading...
						</div>
				}

				{this.props.children}
			</div>
		);
	}
}
