import React from 'react';
import {FormControl} from 'react-bootstrap';
import {FIELDS} from '../constants';

var GameNumberInput = React.createClass({
	propTypes: {
		var: React.PropTypes.string.isRequired,
		value: React.PropTypes.number,
		onChange: React.PropTypes.func.isRequired,
	},
	render() {
		const field = FIELDS[this.props.var];
		const min = field.min ? field.min : 0;
		const max = field.max ? field.max : Math.pow(2, 8*field.numBytes-1)-1;
		const callback = (e) => this.props.onChange(this.props.var, e);
		return <FormControl type="number" min={min} max={max} value={this.props.value} onChange={callback}/>;
	}
});

export default GameNumberInput;