import React, {Component} from 'react';

import './footer.css';

export default class Footer extends Component {
	render() {
		 return (
			<footer className="footer">
				 <p className="small text-center text-muted">
					&copy; 2015 Piotr Zduniak
				</p>
			 </footer>
		);
	}
}