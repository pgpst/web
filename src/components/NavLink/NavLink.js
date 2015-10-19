import React, { Component, PropTypes } from 'react';
import { Link, PropTypes as RPropTypes } from 'react-router';

export default class NavLink extends Component {
	static propTypes = {
		to: PropTypes.string,
		query: PropTypes.object
	};

	static contextTypes = {
		history: RPropTypes.history
	};

	render() {
		const active = this.context.history.isActive(
			this.props.to,
			this.props.query
		) ? 'active' : '';

		return (
			<li className={active}>
				<Link {...this.props} />
			</li>
		);
	}
}
