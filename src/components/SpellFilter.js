import React, { PropTypes } from 'react';
import {Col, FormControl} from 'react-bootstrap';

var SpellFilter = React.createClass({
	propTypes: {
		onChange: PropTypes.func.isRequired,
	},
	render() {
		return (
			<Col md={3}>
				Filter by name:
				<FormControl type="text" placeholder="Enter spell name here" onChange={this.props.onChange} />
			</Col>
		);
	}
});

export default SpellFilter;