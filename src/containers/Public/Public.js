import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import './Public.css';

@connect((state) => ({token: state.auth.token}))
export default class Public extends React.Component {
	static contextTypes = {
		history: PropTypes.object.isRequired
	};

	static propTypes = {
		token: PropTypes.object,
		children: PropTypes.node.isRequired
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.token) {
			setTimeout(() => {
				this.context.history.replaceState(null, '/emails');
			});
		}
	}

	componentWillMount() {
		this.componentWillReceiveProps(this.props);
	}

	render() {
		return (
			<div className="Public">
				{this.props.children}
			</div>
		);
	}
}
