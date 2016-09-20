import React from 'react';
import {Alert} from 'react-bootstrap';

var OutdatedBrowserWarning = React.createClass({
	getInitialState() {
		return {alertVisible: this.props.initialShow};
	},
	handleDismiss() {
		this.setState({alertVisible: false});
	},
	render() {
		if(this.state.alertVisible){
			return (
				<Alert bsStyle="danger" onDismiss={this.handleDismiss}>
					<h4>Sorry, your browser is not supported</h4>
					<p>Try <a target="_blank" href="http://outdatedbrowser.com/"> updading your browser</a>.</p>
				</Alert>
			);
		} else {
			return null;
		}
	}
});

export default OutdatedBrowserWarning;
