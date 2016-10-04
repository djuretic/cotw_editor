import React, { PropTypes } from 'react';
import {FormControl} from 'react-bootstrap';

var GameNumberInput = React.createClass({
	propTypes: {
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		value: PropTypes.number,
		valid: PropTypes.boolean,
		onChange: PropTypes.func.isRequired,
		id: PropTypes.string,
	},
	render() {
		return (
			<FormControl className={this.props.valid ? '' : 'has-error'} type="number" min={this.props.min} max={this.props.max} value={this.props.value}
				onChange={this.props.onChange} id={this.props.id} required/>
		);
	}
});

export default GameNumberInput;
