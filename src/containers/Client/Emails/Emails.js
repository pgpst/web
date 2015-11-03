import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'components';
import './Emails.css';

@connect((state) => ({
	account: state.account
}))
export default class Emails extends React.Component {
	static contextTypes = {
		history: PropTypes.object.isRequired
	};
	
	static propTypes = {
		account: PropTypes.object.isRequired,
		params: PropTypes.object
	};

	componentWillReceiveProps(nextProps) {
		if (!nextProps.params.label) {
			if (nextProps.account.labels && nextProps.account.labels.lookup) {
				let inbox = nextProps.account.labels.lookup["Inbox"];
				if (inbox) {
					this.context.history.replaceState(null, '/emails/' + inbox.id);
				}
			}
		}
	}

	componentWillMount() {
		this.componentWillReceiveProps(this.props);
	}

	render() {
		return (
				<div className="Emails container-fluid">
					<div className="row">
						<div className="col-sm-2">
							<h2>Labels</h2>

							<ul className="nav nav-pills nav-stacked">
								{
									this.props.account.labels &&
									this.props.account.labels.all &&
									this.props.account.labels.all.map((object, i) => {
										return (
											<NavLink to={"/emails/" + object.id} key={i}>{object.name}</NavLink>
										);
									})
								}
							</ul>
						</div>

						<div className="col-sm-4">
							<h2>Threads</h2>
						</div>

						<div className="col-sm-5">
							<h2>Email view</h2>
						</div>
					</div>
				</div>
		);
	}
}
