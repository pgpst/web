import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'components';
import './Emails.css';

@connect((state) => ({
	account: state.account
}))
export default class Emails extends React.Component {
	static propTypes = {
		account: PropTypes.object.isRequired
	};

	render() {
		return (
				<div className="Emails container">
					<div className="row">
						<div className="col-sm-3">
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

						<div className="col-sm-9">
							<h2>Threads</h2>
						</div>
					</div>
				</div>
		);
	}
}
