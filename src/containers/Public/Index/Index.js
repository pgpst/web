import React, { PropTypes } from 'react';
import { NavLink } from 'components';
import './Index.css';

export default class Index extends React.Component {
	render() {
		return (
			<div className="Index container">
				<ul className="nav nav-pills nav-stacked">
					<NavLink to="/signin">Sign in</NavLink>
					<NavLink to="/signup">Create a new account</NavLink>
				</ul>
			</div> 
		);
	}
}
